<script setup lang="ts">
const props = defineProps({
  header: String
})
</script>

<template>
  <header class="header-container md:rounded-t-lg px-6 py-4">
    <h1 class="text-2xl font-medium text-white">{{ props.header }}</h1>
    <p class="text-sm font-norma mt-1 text-white leading-5">On Chat Room</p>
  </header>
</template>

<style scoped>
.header-container {
  background: rgb(116, 89, 242);
  background: linear-gradient(90deg, rgba(116, 89, 242, 1) 8%, rgba(89, 191, 242, 1) 100%);
}
</style>
