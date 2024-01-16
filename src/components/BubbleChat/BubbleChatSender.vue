<script setup lang="ts">
const props = defineProps({
  message: String,
  time: String
})
</script>

<template>
  <div class="flex w-full space-x-3 max-w-xs ml-auto justify-end">
    <div>
      <div class="bg-primary p-3 rounded-l-lg rounded-br-lg">
        <p class="font-normal text-white">
          {{ props.message }}
        </p>
      </div>
      <span class="text-xs text-gray-500 leading-none">
        {{ props.time }}
      </span>
    </div>
    <!-- <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> -->
    <img
      class="h-10 w-10"
      src="https://api.dicebear.com/7.x/fun-emoji/svg?backgroundType=gradientLinear&randomizeIds=true&radius=10"
      alt="avatar"
    />
  </div>
</template>
