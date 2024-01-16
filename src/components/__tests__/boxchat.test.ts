import { mount } from '@vue/test-utils'
import BoxChat from '../BoxChat.vue'
import { describe, test, expect } from 'vitest'

describe('BoxChat', () => {
  test('should render correctly', () => {
    const wrapper = mount(BoxChat)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render with props sender', () => {
    const wrapper = mount(BoxChat, {
      props: {
        name: 'John Doe',
        message: 'Hello, World!',
        time: '10:00 AM',
        isSender: true,
      },
    })
    expect(wrapper.text()).toContain('Hello, World!')
    expect(wrapper.text()).toContain('10:00 AM')
    expect(wrapper.text()).not.toContain('John Doe')
  })

  test('should render with props receiver', () => {
    const wrapper = mount(BoxChat, {
      props: {
        name: 'John Doe',
        message: 'Hello, World!',
        time: '10:00 AM',
        isSender: false,
      },
    })
    expect(wrapper.text()).toContain('Hello, World!')
    expect(wrapper.text()).toContain('10:00 AM')
    expect(wrapper.text()).toContain('John Doe')
  })
})
