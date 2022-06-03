import { ActionType } from './../../constants/index';
export const startLoading = () => {
    return { type: ActionType.START_LOADING }
}

export const finishLoading = () => {
    return { type: ActionType.FINISH_LOADING }
}