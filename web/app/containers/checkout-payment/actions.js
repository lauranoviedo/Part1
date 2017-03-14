import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from '../../utils/utils'
import {makeRequest, makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import checkoutPaymentParser from './checkout-payment-parser'

import {getPaymentBillingFormValues} from '../../store/form/selectors'
import {getCustomerEntityID, getEmailAddress} from '../../store/checkout/selectors'
import {getShippingAddress} from '../../store/checkout/shipping/selectors'
import {getIsLoggedIn} from '../app/selectors'

import {receiveCheckoutData} from '../../store/checkout/actions'

export const receiveContents = createAction('Received CheckoutPayment Contents')
export const toggleFixedPlaceOrder = createAction('Toggled the fixed "Place Order" container', 'isFixedPlaceOrderShown')
export const toggleCardInputRadio = createAction('Toggled the card method radio input', 'isNewCardInputSelected')
export const toggleCompanyAptField = createAction('Showing the "Company" and "Apt #" fields', 'isCompanyOrAptShown')
export const toggleNewAddressFields = createAction('Toggled new address fields', 'newShippingAddressIsEnabled')
export const setCvvType = createAction('Setting CVV type', 'cvvType')

export const receiveResponse = (response) => {
    return (dispatch) => {
        return jqueryResponse(response)
            .then(([$, $responseText]) => {
                dispatch(receiveContents(checkoutPaymentParser($, $responseText)))
            })
    }
}

export const fetchContents = () => {
    return (dispatch) => {
        return makeRequest(window.location.href)
            .then((response) => dispatch(receiveResponse(response)))
    }
}

export const submitPayment = () => {
    return (dispatch, getState) => {
        const currentState = getState()
        const entityID = getCustomerEntityID(currentState)
        const isLoggedIn = getIsLoggedIn(currentState)
        const sameAddress = getPaymentBillingFormValues(currentState).billing_same_as_shipping

        let address = {}
        const email = getEmailAddress(currentState)

        if (sameAddress) {
            address = getShippingAddress(currentState).toJS()
        } else {
            const {
                name,
                company,
                addressLine1,
                addressLine2,
                country_id,
                city,
                region_id,
                postcode,
            } = getPaymentBillingFormValues(currentState)
            const names = name.split(' ')

            address = {
                firstname: names.slice(0, -1).join(' '),
                lastname: names.slice(-1).join(' '),
                company: company || '',
                postcode,
                city,
                street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
                regionId: region_id,
                countryId: country_id,
                saveInAddressBook: false
            }
        }

        const paymentInformation = {
            billingAddress: {
                ...address
            },
            cartId: entityID,
            email,
            paymentMethod: {
                additional_data: null,
                method: 'checkmo',
                po_number: null
            }
        }
        const persistPaymentURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/payment-information`
        // Save payment address for confirmation
        dispatch(receiveCheckoutData({payment: {address}}))
        makeJsonEncodedRequest(persistPaymentURL, paymentInformation, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                // Looks like when it is successful, the responseJSON is a number
                if (/^\d+$/.test(responseJSON)) {
                    browserHistory.push({
                        pathname: '/checkout/onepage/success/'
                    })
                } else {
                    console.error(responseJSON.message)
                }
            })
    }
}
