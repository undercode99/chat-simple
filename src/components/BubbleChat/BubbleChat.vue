<script setup lang="ts">
const props = defineProps({
  name: String,
  message: String,
  time: String
})
</script>

<template>
  <div class="flex w-full space-x-3 max-w-xs">
    <img
      class="h-10 w-10"
      src="https://api.dicebear.com/7.x/fun-emoji/svg?backgroundType=gradientLinear&randomizeIds=true&radius=10"
      alt="avatar"
    />
    <div class="flex flex-col space-y-2">
      <p class="font-semibold text-gray-600 leading-none">
        {{ props.name }}
      </p>
      <div class="bg-gray-100 p-3 rounded-r-lg rounded-bl-lg flex flex-col space-y-2">
        <p class="font-normal text-gray-600">
          {{ props.message }}
        </p>
      </div>
      <span class="text-xs text-gray-500 leading-none">
        {{ props.time }}
      </span>
    </div>
  </div>
</template>
