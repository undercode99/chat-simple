<script setup lang="ts">
import HeaderRegisteredChat from './components/HeaderRegisteredChat.vue'
import BoxChat from './components/BoxChat.vue'
import SenderChat from './components/SenderChat.vue'

import { useChatRegisterStore } from './stores/chat'
const chatRegisterStore = useChatRegisterStore()
</script>

<template>
  <div
    class="flex flex-col min-h-screen flex-grow min-w-full max-w-xl bg-white shadow-xl md:rounded-lg overflow-hidden"
  >
    <HeaderRegisteredChat
      :name="chatRegisterStore.userFullName"
      @onLogout="chatRegisterStore.setLoggedUser"
    />
    <BoxChat />
    <SenderChat />
  </div>
</template>
