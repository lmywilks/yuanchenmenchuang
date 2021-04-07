import { Action } from '@ngrx/store';

export enum AdminActionType {
    LOGIN = '[Admin] Login',
    LOGIN_SUCCESS = '[Admin] Login Success',
    LOGIN_FAILURE = '[Admin] Login Failure',
    LOGOUT = '[Admin] Logout'
}

export class Login implements Action {
    readonly type = AdminActionType.LOGIN;
    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = AdminActionType.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginFailure implements Action {
    readonly type = AdminActionType.LOGIN_FAILURE;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = AdminActionType.LOGOUT;    
}

export type ActionsUnion = 
    Login |
    LoginSuccess |
    LoginFailure |
    Logout;