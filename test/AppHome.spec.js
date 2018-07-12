import Vue from 'vue'
// Vue Test Utils allows you to mount a component without rendering its child components
// (by stubbing them) with the shalow method:
import { mount, shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

import {computed} from '@/mixins/computed'
import {data} from '@/mixins/data'
import AppHome from '@/components/AppHome.vue'

Vue.mixin(data)
Vue.mixin(computed)

describe('AppHome', () => {
  it('default greeting displayed', () => {
    const wrapper = mount(AppHome)
    expect(wrapper.text()).toContain('Добро пожаловать!')
  })

  it('snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(AppHome)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
