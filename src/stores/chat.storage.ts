import { type UserMessages } from './chat.type'

export const KEY_NAME_LOCAL_STORAGE = 'userMessages'
export const TOTAL_PAGES = 8


// fetch message from storage
export const fetchMessageFromStorage = (): UserMessages[] => {
  const storedJsonData = localStorage.getItem(KEY_NAME_LOCAL_STORAGE)
  if (storedJsonData === null) {
    return []
  }
  return JSON.parse(storedJsonData)
}


// save message to storage
export const saveMessageToStorage = (message: UserMessages) => {
  const messagesStroage = fetchMessageFromStorage()
  messagesStroage.push(message)
  localStorage.setItem(KEY_NAME_LOCAL_STORAGE, JSON.stringify(messagesStroage))
}

// paginate data
export const paginate = (data: UserMessages[], page: number, pageSize: number): UserMessages[] => {
  // Create a reversed copy of the array without modifying the original order
  const reversedCopy = [...data].reverse()

  // Calculate start and end indices for the current page
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  // Get the data for the current page from the reversed copy
  const currentPageData = reversedCopy.slice(startIndex, endIndex)

  // Reverse the data back to the original order
  return currentPageData.reverse()
}

// get new message from storage event
export const getNewMessageFromStorage = (newValue: string, oldValue: string): UserMessages[] => {
  const newMessages = JSON.parse(newValue!)
  const oldMessages = JSON.parse(oldValue!)
  const newMessageData = <UserMessages[]>newMessages.slice(oldMessages.length, newMessages.length)
  return newMessageData
}
