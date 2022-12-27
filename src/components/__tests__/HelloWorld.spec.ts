import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BsHeader from '@/components/BsHeader.vue'

describe('BsHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(BsHeader, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
