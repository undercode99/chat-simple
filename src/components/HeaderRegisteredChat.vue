<script setup lang="ts">
const props = defineProps({
  name: String
})
</script>

<template>
  <header class="header-container md:rounded-t-lg px-6 py-4 flex flex-row justify-between">
    <div>
      <h1 class="text-2xl font-medium text-white">Hi, {{ props.name }} 👋</h1>
      <p class="text-sm font-norma mt-1 text-white leading-5">On Chat Room</p>
    </div>
    <button
      class="text-white font-bold py-2 px-4 rounded"
      @click="$emit('onLogout')"
      title="Logout"
    >
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path d="m10.998 16 5-4-5-4v3h-9v2h9z" />
        <path
          d="M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"
        />
      </svg>
    </button>
  </header>
</template>

<style scoped>
.header-container {
  background: rgb(116, 89, 242);
  background: linear-gradient(90deg, rgba(116, 89, 242, 1) 8%, rgba(89, 191, 242, 1) 100%);
}
</style>
