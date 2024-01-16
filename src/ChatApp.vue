<script setup lang="ts">
import BoxChat from './components/BoxChat.vue'
import SenderChat from './components/SenderChat.vue'
import HeaderChat from './components/HeaderChat.vue'
</script>

<template>
  <div
    class="flex flex-col min-h-screen flex-grow min-w-full max-w-xl bg-white shadow-xl md:rounded-lg overflow-hidden"
  >
    <HeaderChat header="Hi, Jhone Doe" />
    <BoxChat />
    <SenderChat />
  </div>
</template>
