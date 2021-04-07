import { ActionReducerMap } from '@ngrx/store';
import * as fromAdmin from './admin';
import * as fromProduct from './product';
import * as fromInfo from './info';

export interface AppState {
    admin: fromAdmin.AdminState,
    product: fromProduct.ProductState,
    info: fromInfo.InfoState
}

export const reducers: ActionReducerMap<AppState, any> = {
    admin: fromAdmin.adminReducer,
    product: fromProduct.productReducer,
    info: fromInfo.infoReducer
};

export const effects = [
    fromAdmin.AdminEffects,
    fromProduct.ProductEffects,
    fromInfo.InfoEffects
]