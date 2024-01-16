<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderRegisteredChat from './components/HeaderRegisteredChat.vue'
import BoxChat from './components/BoxChat.vue'
import SenderChat from './components/SenderChat.vue'

import { useChatRegisterStore, useChatStore } from './stores/chat'
const chatRegisterStore = useChatRegisterStore()
const chatStore = useChatStore()

const chatMessages = ref<HTMLElement>()

const onSendMessage = (message: string) => {
  chatStore.sendMessage({
    userId: chatRegisterStore.userId,
    name: chatRegisterStore.userFullName,
    message,
    time: new Date().toLocaleTimeString()
  })
  scrollToBottom()
}

const scrollToBottom = () => {
  setTimeout(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop =
        chatMessages.value.scrollHeight - chatMessages.value.clientHeight
    }
  }, 100)
}

const loadMessages = () => {
  chatStore.loadInitialMessages()
  scrollToBottom()
}

const eventNewMessage = (e: StorageEvent) => {
  chatStore.notifyNewMessage(e)
  scrollToBottom()

  // notify new message in titile
  document.title = `1 New message`
  setTimeout(() => {
    document.title = 'Chat App'
  }, 5000)

  // play notification
  const audio = new Audio(
    'https://notificationsounds.com/storage/sounds/file-sounds-1351-light-hearted.mp3'
  )
  audio.play()
}

onMounted(() => {
  loadMessages()
  window.addEventListener('storage', eventNewMessage)
  if (chatMessages.value) {
    chatMessages.value.addEventListener('scroll', () => {
      if (chatMessages.value?.scrollTop === 0) {
        chatStore.loadMoreMessages()
      }
    })
  }
})
</script>

<template>
  <div
    class="flex flex-col min-h-screen flex-grow min-w-full max-w-xl bg-white shadow-xl md:rounded-lg overflow-hidden"
  >
    <HeaderRegisteredChat
      :name="chatRegisterStore.userFullName"
      @onLogout="chatRegisterStore.setLoggedUser"
    />
    <div
      ref="chatMessages"
      class="flex flex-col flex-grow h-0 p-4 overflow-auto space-y-8"
      id="chat-box"
    >
      <div class="text-center p-4 text-gray-500 my-auto" v-if="!chatStore.messages.length">
        No messages yet, start a conversation with your friends now!
      </div>

      <BoxChat
        v-else
        v-for="(message, index) in chatStore.messages"
        :key="index"
        :name="message.name"
        :message="message.message"
        :time="message.time"
        :isSender="message.userId === chatRegisterStore.userId"
      />
    </div>
    <SenderChat @onSendMessage="onSendMessage" />
  </div>
</template>
