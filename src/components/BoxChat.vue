<script setup lang="ts">
import BubbleChat from './BubbleChat/BubbleChat.vue'
import BubbleChatSender from './BubbleChat/BubbleChatSender.vue'
</script>

<template>
  <div class="flex flex-col flex-grow h-0 p-4 overflow-auto space-y-8">
    <BubbleChat
      name="Jhone Doe"
      message="Morning guys"
      time="2 min ago"
    />
    <BubbleChat name="Jhone Doe" message="Hello, how are you today?" time="2 min ago" />
    <BubbleChatSender name="Niman" message="We are doing great?" time="5 min ago" />
  </div>
</template>
