import { AdminActionType, ActionsUnion } from './admin.actions';

export interface AdminState {
    isLoading: boolean;
    token: string | null;
    error: any | null;
}

export const initialAdminState: AdminState = {
    isLoading: false,
    token: null,
    error: null
}

export function adminReducer(state = initialAdminState, action: ActionsUnion): AdminState {
    const cloneState = Object.assign({}, state);

    switch (action.type) {
        case AdminActionType.LOGIN:
            cloneState.isLoading = true;
            return cloneState;
        case AdminActionType.LOGIN_SUCCESS:
            cloneState.isLoading = false;
            cloneState.token = action.payload.token;
            return cloneState;
        case AdminActionType.LOGIN_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.payload.error;
            return cloneState;
        case AdminActionType.LOGOUT:
            return initialAdminState;
        default:
            return cloneState;
    }
}