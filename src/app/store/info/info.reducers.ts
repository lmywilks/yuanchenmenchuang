import { InfoActionType, ActionsUnion } from './info.actions';
import { InfoModel } from 'src/app/core/interfaces/info';

export interface InfoState {
    isLoading: boolean;
    info: InfoModel | null;
    message: string | null;
    error: any | null;
}

export const initialInfoState: InfoState = {
    isLoading: false,
    info: null,
    message: null,
    error: null
}

export function infoReducer(state = initialInfoState, action: ActionsUnion): InfoState {
    const cloneState = Object.assign({}, state);

    switch (action.type) {
        case InfoActionType.GET:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case InfoActionType.GET_SUCCESS:
            cloneState.isLoading = false;
            cloneState.info = action.payload.info;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case InfoActionType.GET_FAILURE:
            cloneState.isLoading = false;
            cloneState.info = null;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            return cloneState;
        case InfoActionType.UPDATE:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case InfoActionType.UPDATE_SUCCESS:
            cloneState.isLoading = false;
            cloneState.error = null;
            cloneState.message = action.payload.message;
            return cloneState;
        case InfoActionType.UPDATE_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            cloneState.info = null;
            return cloneState;
        default:
            return cloneState;
    }
}