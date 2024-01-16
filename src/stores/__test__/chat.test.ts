import { setActivePinia, createPinia } from 'pinia'
import { useChatRegisterStore, useChatStore } from '../chat'
import { it, expect, describe, beforeEach } from 'vitest'
import { type UserMessages } from '../chat.type'
import { KEY_NAME_LOCAL_STORAGE } from '../chat.storage'

describe('useChatRegisterStore', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('test se`tNewUser', () => {
    const useChatRegister = useChatRegisterStore()
    expect(useChatRegister.userFullName).toBe('')
    useChatRegister.setNewUser('John')
    expect(useChatRegister.userFullName).toBe('John')
    expect(useChatRegister.userId).toMatch(/john_[A-Za-z0-9]{6}/)
    expect(useChatRegister.userHasRegister).toBe(true)
  })

  it('test not register', () => {
    const useChatRegister = useChatRegisterStore()
    expect(useChatRegister.userFullName).toBe('')
    expect(useChatRegister.userId).toBe('')
    expect(useChatRegister.userHasRegister).toBe(false)
  })
})

describe('useChatStore', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('test send message', () => {
    const useChat = useChatStore()
    useChat.sendMessage({
      message: 'Codeium',
      name: 'Jhon',
      time: '2022-01-01T00:00:00.000Z',
      userId: '7'
    })

    expect(useChat.messages).toHaveLength(1)
    expect(useChat.messages[0]).toEqual({
      message: 'Codeium',
      name: 'Jhon',
      time: '2022-01-01T00:00:00.000Z',
      userId: '7'
    })
  })

  it('Load initial messages', () => {
    const useChat = useChatStore()
    const data: UserMessages[] = [
      {
        message: 'Hello',
        name: 'Jhon',
        time: '2022-01-01T00:00:00.000Z',
        userId: '1'
      },
      {
        message: 'World',
        name: 'Jhon',
        time: '2022-01-01T00:00:00.000Z',
        userId: '2'
      },
      {
        message: 'Codeium',
        name: 'Jhon',
        time: '2022-01-01T00:00:00.000Z',
        userId: '3'
      }
    ]
    localStorage.setItem(KEY_NAME_LOCAL_STORAGE, JSON.stringify(data))
    useChat.loadInitialMessages()
    expect(useChat.messages).toHaveLength(3)
  })
  it('Load initial messages empty', () => {
    const useChat = useChatStore()
    const data: UserMessages[] = []
    localStorage.setItem(KEY_NAME_LOCAL_STORAGE, JSON.stringify(data))
    useChat.loadInitialMessages()
    expect(useChat.messages).toHaveLength(0)
  })
  it('Load more messages paginate', async () => {
    const useChat = useChatStore()
    const data: UserMessages[] = []
    for (let i = 0; i < 60; i++) {
      data.push({
        message: 'Hello',
        name: 'Jhon',
        time: '2022-01-01T00:00:00.000Z',
        userId: i.toString()
      })
    }

    localStorage.setItem(KEY_NAME_LOCAL_STORAGE, JSON.stringify(data))

    // load initial 25 messages
    useChat.loadInitialMessages()
    expect(useChat.messages).toHaveLength(25)

    // load more 25 messages and append them expected to 50
    await useChat.loadMoreMessages()
    expect(useChat.messages).toHaveLength(50)

  })
})
