import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import * as ReduxForm from 'redux-form'

import {getIsLoggedIn} from '../../app/selectors'
import {getShippingInitialValues} from '../../../store/checkout/shipping/selectors'

import {submitShipping} from '../actions'
import {SHIPPING_FORM_NAME} from '../constants'

import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'
import ShippingAddressForm from './shipping-address'
import ShippingEmail from './shipping-email'
import ShippingMethod from './shipping-method'

const validate = (values) => {
    const errors = {}
    const requiredFieldNames = [
        'username',
        'name',
        'addressLine1',
        'city',
        'country_id',
        'region_id',
        'postcode',
        'telephone'
    ]
    if (values.username && !/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
        errors.username = 'Enter a valid email address'
    }

    requiredFieldNames.forEach((fieldName) => {
        if (!values[fieldName]) {
            errors[fieldName] = 'Required'
        }
    })

    return errors
}

class CheckoutShippingForm extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return new Promise((resolve, reject) => {
            const errors = validate(values)
            if (!Object.keys(errors).length) {
                this.props.submitShipping()
                return resolve()
            }
            return reject(new ReduxForm.SubmissionError(errors))
        })
    }

    render() {
        const {
            handleSubmit,
            isLoggedIn
        } = this.props

        return (
            <form className="t-checkout-shipping__form" onSubmit={handleSubmit(this.onSubmit)} noValidate>
                <Grid className="u-center-piece">
                    <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                        {!isLoggedIn && <ShippingEmail />}
                        <ShippingAddressForm />
                    </GridSpan>

                    <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                        <ShippingMethod />
                    </GridSpan>
                </Grid>
            </form>
        )
    }
}

CheckoutShippingForm.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,
    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,
    /**
    * Is the user logged in or not
    */
    isLoggedIn: React.PropTypes.bool,
    /**
    * Submits the shipping form information to the server
    */
    submitShipping: React.PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    initialValues: selectorToJS(getShippingInitialValues),
    isLoggedIn: getIsLoggedIn
})

const mapDispatchToProps = {
    submitShipping
}


const CheckoutShippingReduxForm = ReduxForm.reduxForm({
    form: SHIPPING_FORM_NAME,
    validate,
    keepDirtyOnReinitialize: true,
    enableReinitialize: true
})(CheckoutShippingForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutShippingReduxForm)
