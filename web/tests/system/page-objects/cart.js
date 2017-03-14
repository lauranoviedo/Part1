const selectors = {
    cartTemplateIdentifier: '.cart-container',
    cartCheckout: 'button.checkout',
    removeItem: '.qa-cart__remove-item',
    emptyCart: '.t-cart__empty'
}

const Cart = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Cart.prototype.navigateToCheckout = function() {
    // Navigate from Cart to Checkout
    this.browser
        .log('Navigating to Checkout')
        .waitForElementVisible(selectors.cartCheckout)
        .click(selectors.cartCheckout)
        .waitUntilMobified()
    return this
}

Cart.prototype.removeItems = function() {
    // Remove all items from the cart
    this.browser
        .log('Removing item')
        .element('css selector', selectors.removeItem, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('Removing item from cart')
                    .click(selectors.removeItem)
                    .waitUntilMobified()
                self.cleanUp()
            }
        })
        .waitForElementVisible(selectors.emptyCart)
    return this
}

export default Cart
