import { mount, shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import AppRouterName from '@/components/theme/AppRouterName.vue'

describe('AppRouterName', () => {
  it('default elements displayed', () => {
    const wrapper = mount(AppRouterName, {propsData: {name: 'Some name'}})
    expect(wrapper.text()).toContain('Some name')
  })

  it('snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(AppRouterName)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
