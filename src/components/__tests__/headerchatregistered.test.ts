import { mount } from '@vue/test-utils'
import HeaderRegisteredChat from '../HeaderRegisteredChat.vue'
import { describe, test, expect } from 'vitest'

describe('HeaderChatRegistered', () => {

  test('should render with props', () => {
    const wrapper = mount(HeaderRegisteredChat, {
      props: {
        name: 'John Doe'
      }
    })
    expect(wrapper.text()).toContain('Hi, John Doe 👋')
    expect(wrapper.text()).toContain('On Chat Room')
  })
})
