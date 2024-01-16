<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')
const $emit = defineEmits(['onSendMessage'])

const onSendMessage = () => {
  if (!message.value) {
    return
  }
  $emit('onSendMessage', message.value)
  message.value = ''
}
</script>

<template>
  <form @submit.prevent="onSendMessage" class="bg-gray-100 p-2 flex">
    <input
      class="flex items-center h-10 w-full rounded px-3 text-sm"
      type="text"
      placeholder="Type your message…"
      v-model="message"
    />
    <button class="ml-2 bg-primary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 16 16"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.91L1.78 1.5L15 7.44899V8.3999L1.78 14.33L1 13.91L2.58311 8L1 1.91ZM3.6118 8.5L2.33037 13.1295L13.5 7.8999L2.33037 2.83859L3.6118 7.43874L9 7.5V8.5H3.6118Z"
        ></path>
      </svg>
    </button>
  </form>
</template>
