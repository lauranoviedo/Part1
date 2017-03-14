import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {CART_REMOVE_ITEM_MODAL} from '../constants'
import {removeFromCart} from '../../../store/cart/actions'
import {closeModal} from '../../../store/modals/actions'
import {isModalOpen} from '../../../store/selectors'
import {getRemoveItemID} from '../selectors'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'

const CartRemoveItemModal = ({closeModal, isOpen, removeItemID, removeFromCart}) => {
    return (
        <Sheet
            className="pw--no-shadow t-cart__remove-item-confirmation-modal"
            open={isOpen}
            onDismiss={closeModal}
            maskOpacity={0.7}
            effect="modal-center"
            shrinkToContent={true}
            coverage="90%"
        >
            <div className="u-flexbox u-direction-column u-align-center u-padding-md u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                <div className="u-padding-md">
                    <Image
                        src={getAssetUrl('static/img/cart/remove-item@2x.png')}
                        alt=""
                        height="75px"
                        width="95px"
                    />
                </div>

                <p className="u-h5 u-padding-top u-margin-bottom-md">
                    <strong>Remove Item</strong>
                </p>

                <p className="u-margin-bottom-lg u-padding-start-lg u-padding-end-lg">
                    Are you sure you want to remove this item from your cart?
                </p>

                <div className="u-flex u-flexbox">
                    <Button
                        className="c--tertiary u-text-uppercase u-flex"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="c--secondary u-text-uppercase u-flex u-margin-start"
                        onClick={() => {
                            closeModal()
                            removeFromCart(removeItemID)
                        }}
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </Sheet>
    )
}

CartRemoveItemModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,
    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,
    /**
    * Removes the item from the cart
    */
    removeFromCart: React.PropTypes.func,
    /**
    * The id of the item being deleted
    */
    removeItemID: React.PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    isOpen: isModalOpen(CART_REMOVE_ITEM_MODAL),
    removeItemID: getRemoveItemID
})

const mapDispatchToProps = {
    closeModal: () => closeModal(CART_REMOVE_ITEM_MODAL),
    removeFromCart
}
export default connect(mapStateToProps, mapDispatchToProps)(CartRemoveItemModal)
