import { test, expect, describe } from 'vitest'

import {
  fetchMessageFromStorage,
  saveMessageToStorage,
  KEY_NAME_LOCAL_STORAGE,
  paginate,
  getNewMessageFromStorage
} from '../chat.storage'
import { type UserMessages } from '../chat.type'

describe('fetchMessageFromStorage', () => {
  test('should return an empty array if the stored data is null', () => {
    const result = fetchMessageFromStorage()
    expect(result).toEqual([])
  })

  test('should return the parsed stored data if it is not null', () => {
    const storedData = [
      { id: 1, message: 'Hello' },
      { id: 2, message: 'World' }
    ]
    localStorage.setItem(KEY_NAME_LOCAL_STORAGE, JSON.stringify(storedData))

    const result = fetchMessageFromStorage()

    expect(result).toEqual(storedData)
  })
})

describe('saveMessageToStorage', () => {
  test('should save message to storage', () => {
    const message = {
      message: 'Hello',
      name: 'Jhon',
      time: '2022-01-01T00:00:00.000Z',
      userId: '1'
    }
    saveMessageToStorage(message)

    const storedMessages = JSON.parse(localStorage.getItem(KEY_NAME_LOCAL_STORAGE) || '[]')
    expect(storedMessages).toContainEqual(message)
  })
})

describe('paginate', () => {
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
    },
    {
      message: 'Codeium',
      name: 'Jhon',
      time: '2022-01-01T00:00:00.000Z',
      userId: '4'
    },
    {
      message: 'Codeium',
      name: 'Jhon',
      time: '2022-01-01T00:00:00.000Z',
      userId: '5'
    },
    {
      message: 'Codeium',
      name: 'Jhon',
      time: '2022-01-01T00:00:00.000Z',
      userId: '6'
    },
    {
      message: 'Codeium',
      name: 'Jhon',
      time: '2022-01-01T00:00:00.000Z',
      userId: '7'
    },
    {
      message: 'Codeium',
      name: 'Jhon',
      time: '2022-01-01T00:00:00.000Z',
      userId: '8'
    }
  ]

  test('should return an empty array when data is empty', () => {
    const data: UserMessages[] = []
    const page = 1
    const pageSize = 10

    const result = paginate(data, page, pageSize)

    expect(result).toEqual([])
  })

  test('should return the full data array when pageSize is greater than the data length', () => {
    const page = 1
    const pageSize = 10

    const result = paginate(data, page, pageSize)

    expect(result).toEqual(data)
  })

  test('should return the correct page of data when pageSize is less than the data length', () => {
    const page = 1
    const pageSize = 2

    const result = paginate(data, page, pageSize)

    expect(result).toEqual([
      {
        message: 'Codeium',
        name: 'Jhon',
        time: '2022-01-01T00:00:00.000Z',
        userId: '7'
      },
      {
        message: 'Codeium',
        name: 'Jhon',
        time: '2022-01-01T00:00:00.000Z',
        userId: '8'
      }
    ])
  })

  test('should return the last page of data when page is greater than the number of pages', () => {
    const page = 2
    const pageSize = 4

    const result = paginate(data, page, pageSize)

    expect(result).toEqual([
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
      },
      {
        message: 'Codeium',
        name: 'Jhon',
        time: '2022-01-01T00:00:00.000Z',
        userId: '4'
      }
    ])
  })
})

describe('getNewMessageFromStorage', () => {
  test('should return an empty array when old and new messages are empty', () => {
    const newValue = '[]'
    const oldValue = '[]'
    expect(getNewMessageFromStorage(newValue, oldValue)).toEqual([])
  })

  test('should return new messages when there are no old messages', () => {
    const newValue = '[{ "id": 1, "content": "Hello" }]'
    const oldValue = '[]'
    expect(getNewMessageFromStorage(newValue, oldValue)).toEqual([{ id: 1, content: 'Hello' }])
  })

  test('should return new messages when there are old messages', () => {
    const newValue = '[{ "id": 1, "content": "Hello" }, { "id": 2, "content": "World" }]'
    const oldValue = '[{ "id": 1, "content": "Hello" }]'
    expect(getNewMessageFromStorage(newValue, oldValue)).toEqual([{ id: 2, content: 'World' }])
  })
})
