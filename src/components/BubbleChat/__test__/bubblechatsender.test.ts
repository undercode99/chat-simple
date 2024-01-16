import { mount } from '@vue/test-utils'
import BubbleChatSender from '../BubbleChatSender.vue'
import { describe, test, expect } from 'vitest'

describe('BubbleChatSender', () => {
  test('should render correctly', () => {
    const wrapper = mount(BubbleChatSender)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render correctly with props', () => {
    const wrapper = mount(BubbleChatSender, {
      props: {
        name: 'John Doe',
        message: 'Hello, World!',
        time: '10:00 AM',
      },
    })
    expect(wrapper.text()).toContain('Hello, World!')
    expect(wrapper.text()).toContain('10:00 AM')
  })
})
