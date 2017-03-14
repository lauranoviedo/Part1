/* eslint-env jest */
import {productSubtotal} from './partials/mini-cart-product-list'

describe('Computing the subtotal', () => {

    test('Should not modify with qty of 1', () => {
        const originalPrice = '$12.99'
        const computedPriceQty = productSubtotal(originalPrice, 1)
        expect(`$${computedPriceQty}`).toEqual(originalPrice)
    })

    test('Should correctly multiply by qty', () => {
        const originalPrice = '$12.40'
        const computedPriceQty = productSubtotal(originalPrice, 3)
        expect(computedPriceQty).toEqual('37.20')
    })

})
