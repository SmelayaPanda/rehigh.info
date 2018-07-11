import Vue from 'vue'
import { mount } from 'vue-test-utils'
import {computed} from '@/mixins/computed'
import {data} from '@/mixins/data'

import AppHome from '@/components/AppHome.vue'

Vue.mixin(data)
Vue.mixin(computed)

describe('AppHome', () => {
  it('приветствие', () => {
    const wrapper = mount(AppHome)
    expect(wrapper.text()).toContain('Добро пожаловать!')
  })
})
