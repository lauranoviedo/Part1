/* eslint-env jest */
import React from 'react'
import ConnectedCartProductList from './cart-product-list'
import {mount, shallow} from 'enzyme'

const CartProductList = ConnectedCartProductList.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<CartProductList items={[]} />)

    expect(wrapper.length).toBe(1)
})

test('renders without errors with one item', () => {
    const wrapper = mount(<CartProductList items={[{product_name: 'TestName', product_image: {alt: 'TestAlt', src: 'TestSrc'}}]} summary_count={1} />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__product-list'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartProductList items={[]} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})
