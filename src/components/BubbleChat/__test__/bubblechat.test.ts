import { mount } from '@vue/test-utils'
import BubbleChat from '../BubbleChat.vue'
import { describe, test, expect } from 'vitest'

describe('BubbleChat', () => {
  test('should render correctly', () => {
    const wrapper = mount(BubbleChat)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render correctly with props', () => {
    const wrapper = mount(BubbleChat, {
      props: {
        name: 'John Doe',
        message: 'Hello, World!',
        time: '10:00 AM',
      },
    })
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Hello, World!')
    expect(wrapper.text()).toContain('10:00 AM')
  })
})
