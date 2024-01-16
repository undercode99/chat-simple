import { test, expect, describe } from 'vitest'
import { makeid, makeUserId } from '../generator'

describe('makeid', () => {
  test('should generate a string of the specified length', () => {
    const length = 10
    const id = makeid(length)
    expect(id.length).toEqual(length)
  })

  test('should only contain uppercase letters, lowercase letters, and numbers', () => {
    const length = 10
    const id = makeid(length)
    const validCharacters = /^[a-zA-Z0-9]+$/
    expect(validCharacters.test(id)).toBe(true)
  })

  test('should generate a different id each time', () => {
    const length = 10
    const id1 = makeid(length)
    const id2 = makeid(length)
    expect(id1).not.toEqual(id2)
  })
})

describe('makeUserId', () => {
  test('should convert name to snack case and append a random 6-character string', () => {
    const result = makeUserId('john')
    expect(result).toMatch(/john_[A-Za-z0-9]{6}/)
  })

  test('should handle multiple words in name', () => {
    const result = makeUserId('maryJane')
    expect(result).toMatch(/maryjane_[A-Za-z0-9]{6}/)
  })

  test('should handle special characters in name', () => {
    const result = makeUserId('john-doe')
    expect(result).toMatch(/john-doe_[A-Za-z0-9]{6}/)
  })
})
