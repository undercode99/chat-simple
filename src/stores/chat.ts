import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { makeUserId } from '../utils/generator'
import {
  saveMessageToStorage,
  fetchMessageFromStorage,
  getNewMessageFromStorage,
  TOTAL_PAGES,
  paginate
} from './chat.storage'
import { type UserMessages } from './chat.type'

export const useChatRegisterStore = defineStore('userChatRegister', () => {
  const userFullName = ref<string>('')
  const userId = ref<string>('')

  function setNewUser(name: string) {
    userFullName.value = name
    userId.value = makeUserId(name)
  }

  const userHasRegister = computed(() => {
    return userFullName.value !== ''
  })

  const setLoggedUser = () => {
    userFullName.value = ''
  }

  return { userFullName, userId, setNewUser, userHasRegister, setLoggedUser }
})

export const useChatStore = defineStore('chatMessages', () => {
  const messages = ref<UserMessages[]>([])
  const currentPage = ref<number>(1)

  function sendMessage(message: UserMessages) {
    saveMessageToStorage(message)
    messages.value.push(message)
  }

  // paginate data
  function loadMoreMessages() {
    const numPages = currentPage.value + 1
    const results = paginate(fetchMessageFromStorage(), numPages, TOTAL_PAGES)
    if (results.length === 0) {
      return
    }
    messages.value = [
      ...results,
      ...messages.value
    ]
    currentPage.value = numPages
  }

  // fetch initial data
  function loadInitialMessages() {
    messages.value = paginate(fetchMessageFromStorage(), 1, TOTAL_PAGES)
  }

  // get new message from storage event
  function notifyNewMessage(stroageEvent: StorageEvent) {
    const newMessages = getNewMessageFromStorage(stroageEvent.newValue!, stroageEvent.oldValue!)
    if (newMessages.length === 0) {
      return
    }
    messages.value = [...messages.value, ...newMessages]
  }

  return {
    messages,
    sendMessage,
    loadMoreMessages,
    loadInitialMessages,
    notifyNewMessage
  }
})
