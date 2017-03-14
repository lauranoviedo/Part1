import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import * as ReduxForm from 'redux-form'

import {getShippingMethods} from '../../../store/checkout/shipping/selectors'
import {getCustomerEntityID} from '../../../store/checkout/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import ShippingMethodLabel from './shipping-method-label'


const ShippingMethod = ({shippingMethods}) => {
    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-md">
                <h2 className="u-h4 u-text-uppercase">Shipping Method</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                {shippingMethods && shippingMethods.map(({label, cost, value}, idx) => {
                    return (
                        <FieldRow key={idx}>
                            <ReduxForm.Field
                                component={Field}
                                name="shipping_method"
                                type="radio"
                                value={value}
                                label={<ShippingMethodLabel label={label} cost={cost} />}
                            >
                                <input type="radio" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>
                    )
                })}

                <FieldRow className="u-margin-top-lg">
                    <Button type="submit" className="c--primary u-width-full u-text-uppercase">
                        Continue to Payment
                    </Button>
                </FieldRow>
            </div>
        </div>
    )
}

ShippingMethod.propTypes = {
    /**
    * An identifier for the current users cart
    */
    entityID: PropTypes.string,
    /**
    * The available shipping methods for the order
    */
    shippingMethods: PropTypes.arrayOf(PropTypes.shape({
        cost: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string
    })),
    /**
    * (Internal) Added by redux form
    */
    submitting: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
    entityID: getCustomerEntityID,
    shippingMethods: selectorToJS(getShippingMethods)
})


export default connect(
    mapStateToProps
)(ShippingMethod)
