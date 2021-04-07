import { Action } from '@ngrx/store';
import { InfoModel } from 'src/app/core/interfaces/info';

export enum InfoActionType {
    GET             = '[Info] Get',
    GET_SUCCESS     = '[Info] Get Success',
    GET_FAILURE     = '[Info] Get Failure',
    UPDATE          = '[Info] Update',
    UPDATE_SUCCESS  = '[Info] Update Success',
    UPDATE_FAILURE  = '[Info] Update Failure'
}

export class Get implements Action {
    readonly type = InfoActionType.GET;
    constructor() {}
}

export class GetSuccess implements Action {
    readonly type = InfoActionType.GET_SUCCESS;
    constructor(public payload: any) {}
}

export class GetFailure implements Action {
    readonly type = InfoActionType.GET_FAILURE;
    constructor(public payload: any) {}
}

export class Update implements Action {
    readonly type = InfoActionType.UPDATE;
    constructor(public info: InfoModel) {}    
}

export class UpdateSuccess implements Action {
    readonly type = InfoActionType.UPDATE_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateFailure implements Action {
    readonly type = InfoActionType.UPDATE_FAILURE;
    constructor(public payload: any) {}
}

export type ActionsUnion = 
    Get |
    GetSuccess |
    GetFailure |
    Update |
    UpdateSuccess |
    UpdateFailure;