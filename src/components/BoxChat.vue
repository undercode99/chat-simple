<script setup lang="ts">
import BubbleChat from './BubbleChat/BubbleChat.vue'
import BubbleChatSender from './BubbleChat/BubbleChatSender.vue'

const props = defineProps({
  name: String,
  message: String,
  time: String,
  isSender: Boolean
})
</script>

<template>
  <BubbleChat
    v-if="!props.isSender"
    :name="props.name"
    :message="props.message"
    :time="props.time"
  />

  <BubbleChatSender v-else :name="props.name" :message="props.message" :time="props.time" />
</template>
