<script setup lang="ts">
import { ref } from 'vue'
import HeaderChat from './components/HeaderChat.vue'
import { useChatRegisterStore } from './stores/chat'

const chatRegisterStore = useChatRegisterStore()
const fullName = ref('')

</script>

<template>
  <div
    class="flex flex-col min-h-screen relative flex-grow min-w-full max-w-xl bg-white shadow-xl md:rounded-lg overflow-hidden"
  >
    <HeaderChat header="Register User" />
    <div class="p-8 text-center my-auto">
      <h2 class="text-2xl font-semibold leading-7 text-gray-900">Welcome to Chat App</h2>
      <p class="mt-1 leading-6 text-gray-600">Please register first to enter the chat room</p>
      <form
        class="mt-6 flex flex-col gap-y-6"
        @submit.prevent="chatRegisterStore.setNewUser(fullName)"
      >
        <div>
          <label for="full-name" class="block text-sm font-medium leading-6 text-gray-900"
            >Your Name <span class="text-red-500">*</span>
          </label>
          <div class="mt-2">
            <input
              type="text"
              name="full-name"
              v-model="fullName"
              id="full-name"
              autocomplete="given-name"
              placeholder="Type your name …"
              required
              class="block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          type="submit"
          class="bg-primary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Join Chat
        </button>
      </form>
    </div>
  </div>
</template>
