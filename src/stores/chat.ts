import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChatRegisterStore = defineStore('userChatRegister', () => {
  const userFullName = ref<string>('')

  function setNewUser(name: string) {
    userFullName.value = name
  }

  const userHasRegister = computed(() => {
    return userFullName.value !== ''
  })

  const setLoggedUser = () => {
    userFullName.value = ""
  }

  return { userFullName, setNewUser, userHasRegister, setLoggedUser }
})
