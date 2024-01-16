<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import HeaderRegisteredChat from './components/HeaderRegisteredChat.vue'
import BoxChat from './components/BoxChat.vue'
import SenderChat from './components/SenderChat.vue'

import { useChatRegisterStore, useChatStore } from './stores/chat'
const chatRegisterStore = useChatRegisterStore()
const chatStore = useChatStore()

const chatMessagesEl = ref<HTMLElement>()
const previousScrollHeightMinusScrollTop = ref(0)

const recordScrollPosition = () => {
  if (chatMessagesEl.value) {
    previousScrollHeightMinusScrollTop.value =
      chatMessagesEl.value.scrollHeight - chatMessagesEl.value.scrollTop
  }
}

const restoreScrollPosition = () => {
  if (chatMessagesEl.value) {
    chatMessagesEl.value.scrollTop =
      chatMessagesEl.value.scrollHeight - previousScrollHeightMinusScrollTop.value
  }
}

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
  nextTick(() => {
    if (chatMessagesEl.value) {
      chatMessagesEl.value.scrollTop =
        chatMessagesEl.value.scrollHeight - chatMessagesEl.value.clientHeight
    }
  })
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

const onLoadMoreMessages = async () => {
  recordScrollPosition()
  await chatStore.loadMoreMessages()
  nextTick(() => restoreScrollPosition())
}

onMounted(() => {
  loadMessages()
  window.addEventListener('storage', eventNewMessage)
  if (chatMessagesEl.value) {
    chatMessagesEl.value.addEventListener('scroll', async () => {
      if (chatMessagesEl.value?.scrollTop === 0) {
        onLoadMoreMessages()
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
      ref="chatMessagesEl"
      class="flex flex-col flex-grow h-0 p-4 overflow-auto space-y-4"
      id="chat-box"
    >
      <div class="text-center p-1 text-gray-500 my-auto" v-if="chatStore.loadingLoadMore">
        Loading more messages...
      </div>
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
