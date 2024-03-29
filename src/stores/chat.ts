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
  const loadingLoadMore = ref<boolean>(false)
  const noMoreData = ref<boolean>(false)

  function sendMessage(message: UserMessages): void {
    saveMessageToStorage(message)
    messages.value.push(message)
  }

  // paginate data
  async function loadMoreMessages(): Promise<void> {
    // check if no more data
    if (noMoreData.value) {
      return
    }
    // just load more data after 1 second to show loading
    loadingLoadMore.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const numPages = currentPage.value + 1
    const results = paginate(fetchMessageFromStorage(), numPages, TOTAL_PAGES)
    if (results.length === 0) {
      noMoreData.value = true
      loadingLoadMore.value = false
      return
    }
    messages.value = [...results, ...messages.value]
    currentPage.value = numPages
    loadingLoadMore.value = false
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
    loadingLoadMore,
    noMoreData,
    sendMessage,
    loadMoreMessages,
    loadInitialMessages,
    notifyNewMessage
  }
})
