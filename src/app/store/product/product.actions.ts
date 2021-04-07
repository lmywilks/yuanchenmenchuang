import { Action } from '@ngrx/store';
import { ProductModel } from 'src/app/core/interfaces/product';

export enum ProductActionType {
    CREATE              = '[Product] Create',
    CREATE_SUCCESS      = '[Product] Create Success',
    CREATE_FAILURE      = '[Product] Create Failure',
    FETCH               = '[Product] Fetch',
    FETCH_SUCCESS       = '[Product] Fetch Success',
    FETCH_FAILURE       = '[Product] Fetch Failure',
    UPDATE              = '[Product] Update',
    UPDATE_SUCCESS      = '[Product] Update Success',
    UPDATE_FAILURE      = '[Product] Update Failure',
    RETRIEVE            = '[Product] Retrieve',
    RETRIEVE_SUCCESS    = '[Product] Retrieve Success',
    RETRIEVE_FAILURE    = '[Product] Retrieve Failure',
    DELETE              = '[Product] Delete',
    DELETE_SUCCESS      = '[Product] Delete Success',
    DELETE_FAILURE      = '[Product] Delete Failure',
    UPLOAD              = '[Product] Upload',
    UPLOAD_SUCCESS      = '[Product] Upload Success',
    UPLOAD_FAILURE      = '[Product] Upload Failure',
    DELETE_IMAGE        = '[Product] Delete Image',
    DELETE_IMAGE_SUCCESS= '[Product] Delete Image Success',
    DELETE_IMAGE_FAILURE= '[Product] Delete Image Failure',
}

export class Create implements Action {
    readonly type = ProductActionType.CREATE;
    constructor(public product: ProductModel) {}
}

export class CreateSuccess implements Action {
    readonly type = ProductActionType.CREATE_SUCCESS;
    constructor(public payload: any) {}
}

export class CreateFailure implements Action {
    readonly type = ProductActionType.CREATE_FAILURE;
    constructor(public payload: any) {}
}

export class Fetch implements Action {
    readonly type = ProductActionType.FETCH;
    constructor() {}
}

export class FetchSuccess implements Action {
    readonly type = ProductActionType.FETCH_SUCCESS;
    constructor(public payload: any) {}
}

export class FetchFailure implements Action {
    readonly type = ProductActionType.FETCH_FAILURE;
    constructor(public payload: any) {}
}

export class Update implements Action {
    readonly type = ProductActionType.UPDATE;
    constructor(public product: ProductModel) {}
}

export class UpdateSuccess implements Action {
    readonly type = ProductActionType.UPDATE_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateFailure implements Action {
    readonly type = ProductActionType.UPDATE_FAILURE;
    constructor(public payload: any) {}
}

export class Retrieve implements Action {
    readonly type = ProductActionType.RETRIEVE;
    constructor(public productId: string) {}
}

export class RetrieveSuccess implements Action {
    readonly type = ProductActionType.RETRIEVE_SUCCESS;
    constructor(public payload: any) {}
}

export class RetrieveFailure implements Action {
    readonly type = ProductActionType.RETRIEVE_FAILURE;
    constructor(public payload: any) {}
}

export class Delete implements Action {
    readonly type = ProductActionType.DELETE;
    constructor(public productId: string) {}
}

export class DeleteSuccess implements Action {
    readonly type = ProductActionType.DELETE_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteFailure implements Action {
    readonly type = ProductActionType.DELETE_FAILURE;
    constructor(public payload: any) {}
}

export class Upload implements Action {
    readonly type = ProductActionType.UPLOAD;
    constructor(public payload: any) {}
}

export class UploadSuccess implements Action {
    readonly type = ProductActionType.UPLOAD_SUCCESS;
    constructor(public payload: any) {}
}

export class UploadFailure implements Action {
    readonly type = ProductActionType.UPLOAD_FAILURE;
    constructor(public payload: any) {}
}

export class DeleteImage implements Action {
    readonly type = ProductActionType.DELETE_IMAGE;
    constructor(public payload: any) {}
}

export class DeleteImageSuccess implements Action {
    readonly type = ProductActionType.DELETE_IMAGE_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteImageFailure implements Action {
    readonly type = ProductActionType.DELETE_IMAGE_FAILURE;
    constructor(public payload: any) {}
}

export type ActionsUnion = 
    Create |
    CreateSuccess |
    CreateFailure |
    Fetch |
    FetchSuccess |
    FetchFailure |
    Update |
    UpdateSuccess |
    UpdateFailure |
    Retrieve |
    RetrieveSuccess |
    RetrieveFailure |
    Delete |
    DeleteSuccess |
    DeleteFailure |
    Upload |
    UploadSuccess |
    UploadFailure |
    DeleteImage |
    DeleteImageSuccess |
    DeleteImageFailure;