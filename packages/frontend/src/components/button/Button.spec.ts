import { mount } from '@vue/test-utils'
import ButtonVue from './Button.vue'

describe('按钮测试', () => {
  it('按钮能显示文本', () => {
    const content = 'test'
    const wrapper = mount(ButtonVue, {
      slots: {
        default: content,
      },
    })
    expect(wrapper.text()).toBe(content)
  })

  it('按钮能控制大小', () => {
    const size = 'small'
    const wrapper = mount(ButtonVue, {
      props: {
        size,
      },
    })

    expect(wrapper.classes()).toContain('my-button--small')
  })
})
