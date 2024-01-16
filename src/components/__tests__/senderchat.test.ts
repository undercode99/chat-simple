import { mount } from '@vue/test-utils'
import SenderChat from '../SenderChat.vue'
import { describe, test, expect } from 'vitest'

describe('HeaderChat', () => {
  test('send message trigger onSendMessage', () => {
    const wrapper = mount(SenderChat, {
        attachToDocument: true
    })
    wrapper.find("input").setValue('Hello')
    wrapper.find("form").trigger('submit.prevent')
    expect(wrapper.emitted()).toHaveProperty('onSendMessage')
    expect(wrapper.emitted('onSendMessage')![0][0]).toBe('Hello')
  })
})
