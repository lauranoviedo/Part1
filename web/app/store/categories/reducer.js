import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCategory} from './actions'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    ...mergePayloadForActions(receiveCategory)
}, initialState)

export default categoryReducer
