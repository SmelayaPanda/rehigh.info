import { mount, shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import Contacts from '@/components/contacts/Contacts.vue'

describe('Contacts', () => {
  it('default elements displayed', () => {
    const wrapper = mount(Contacts)
    expect(wrapper.find('h1').html()).toEqual('<h1>Re:High Studio</h1>')
  })

  it('snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Contacts)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
