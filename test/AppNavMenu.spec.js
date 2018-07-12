import Vue from 'vue'
import {createLocalVue, mount, shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'
import Vuex from 'vuex'
import {computed} from '@/mixins/computed'
import {data} from '@/mixins/data'
import AppNavMenu from '@/components/AppNavMenu.vue'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.prototype.$bus = new Vue()
Vue.mixin(data)
Vue.mixin(computed)

describe('AppNavMenu', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  it('default title displayed', () => {
    const wrapper = shallow(AppNavMenu, {store, localVue, router})
    expect(wrapper.text()).toContain('work panel')
  })

  it('component has same HTML structure', () => {
    const renderer = createRenderer()
    const wrapper = shallow(AppNavMenu, {store, localVue, router})
    // wrapper.setData({ miniVariant: true })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
