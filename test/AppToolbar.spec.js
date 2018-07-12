import Vue from 'vue'
// Vue Test Utils allows you to mount a component without rendering its child components
// (by stubbing them) with the shalow method:
import { mount, shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

import {computed} from '@/mixins/computed'
import {data} from '@/mixins/data'
import AppToolbar from '@/components/AppToolbar.vue'

Vue.mixin(data)
Vue.mixin(computed)
Vue.prototype.$bus = new Vue()

describe('AppToolbar', () => {
  it('default elements displayed', () => {
    const wrapper = mount(AppToolbar)
    expect(wrapper.text()).toContain('notifications_none')
  })

  it('snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(AppToolbar)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
