import { mount } from '@vue/test-utils'
import HeaderChat from '../HeaderChat.vue'
import { describe, test, expect } from 'vitest'

describe('HeaderChat', () => {
  test('should render correctly', () => {
    const wrapper = mount(HeaderChat)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render with props', () => {
    const wrapper = mount(HeaderChat, {
      props: {
        header: 'Welcome'
      }
    })
    expect(wrapper.text()).toContain('Welcome')
    expect(wrapper.text()).toContain('On Chat Room')
  })
})
