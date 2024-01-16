<script setup lang="ts">
import RegisterChat from './RegisterChat.vue'
import ChatApp from './ChatApp.vue'
import { useChatRegisterStore } from './stores/chat'

const chatRegisterStore = useChatRegisterStore()
</script>

<template>
  <div class="max-w-md w-full bg-white rounded-xl shadow-sm border md:mx-auto">
    <ChatApp v-if="chatRegisterStore.userHasRegister" />
    <RegisterChat v-else />
  </div>
</template>
