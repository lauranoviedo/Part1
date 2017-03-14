import {createGetSelector} from '../utils/selector-utils'

export const getUi = ({ui}) => ui

export const getModals = ({modals}) => modals
export const isModalOpen = (modalName) => createGetSelector(getModals, modalName, false)

export const getCategories = ({categories}) => categories
export const getProducts = ({products}) => products
export const getCart = ({cart}) => cart
export const getCheckout = ({checkout}) => checkout
export const getForm = ({form}) => form
