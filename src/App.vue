<script setup lang="ts">
import { useCounterStore } from './stores/counter'
const counter = useCounterStore()
const increment = () => {
  counter.increment()
}
</script>

<template>
  <div class="text-red-500">
    <p>Chat Simple</p>
    <button
      @click="increment"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Increment +{{ counter.count }}
    </button>
  </div>
</template>
