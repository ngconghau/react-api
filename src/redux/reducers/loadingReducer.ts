import { ActionType } from './../../constants/index';
interface loading {
    isLoading: boolean,
}

const initialState: loading = {
    isLoading: false,
}

const loadingReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionType.START_LOADING:
            return { ...state, isLoading: true } as loading
        case ActionType.FINISH_LOADING:
            return { ...state, isLoading: false } as loading
        default:
            return state
    }
}

export default loadingReducer
