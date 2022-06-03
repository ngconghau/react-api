import { combineReducers } from 'redux'
import LoadingReducer from './loadingReducer'
export const reducers = combineReducers({
    loadingReducer: LoadingReducer
})

export type State = ReturnType<typeof reducers>