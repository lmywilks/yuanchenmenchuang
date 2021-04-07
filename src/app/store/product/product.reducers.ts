import { ProductActionType, ActionsUnion } from './product.actions';
import { ProductModel } from 'src/app/core/interfaces/product';

export interface ProductState {
    isLoading: boolean;
    productList: ProductModel[];
    product: ProductModel | null;
    error: any | null;
    message: string | null;
}

export const initialProductState: ProductState = {
    isLoading: false,
    productList: [],
    product: null,    
    error: null,
    message: null
}

export function productReducer(state=initialProductState, action: ActionsUnion) {
    const cloneState = Object.assign({}, state);

    switch (action.type) {
        case ProductActionType.CREATE:
            cloneState.isLoading =true;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.CREATE_SUCCESS:
            cloneState.isLoading = false;
            let p = Object.assign({}, action.payload.product);
            if (!p.imageUrls) p.imageUrls = [];
            cloneState.product = p;

            let l = Object.assign([], cloneState.productList);            
            l.push(p);
            cloneState.productList = l;
                                         
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.CREATE_FAILURE:
            cloneState.isLoading = false;
            cloneState.product = null;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.FETCH:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.FETCH_SUCCESS:
            cloneState.productList = action.payload.products;
            cloneState.isLoading = false;
            cloneState.error = null;
            cloneState.message = null;          
            return cloneState;
        case ProductActionType.FETCH_FAILURE:
            cloneState.productList = [];
            cloneState.isLoading = false;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.RETRIEVE:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.RETRIEVE_SUCCESS:
            cloneState.product = action.payload.product;
            cloneState.isLoading = false;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.RETRIEVE_FAILURE:
            cloneState.product = null;
            cloneState.isLoading = false;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.UPDATE:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = null;            
            return cloneState;
        case ProductActionType.UPDATE_SUCCESS:
            cloneState.isLoading = false;
            cloneState.error = null;
            cloneState.message = action.payload.message;
            cloneState.product = action.payload.product;
            let ul = Object.assign([], cloneState.productList);
            let i = -1;
            ul = ul.filter((p: any, index) => {
                if (p.productId === action.payload.product.productId) {
                    i = index;
                }
                return p.productId !== action.payload.product.productId;
            });
            ul = ul.splice(i, 1);
            ul.splice(i, 0, action.payload.product);
            cloneState.productList = ul;
            return cloneState;
        case ProductActionType.UPDATE_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.DELETE:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = null;            
            return cloneState;
        case ProductActionType.DELETE_SUCCESS:
            cloneState.isLoading = false;
            cloneState.error = null;
            cloneState.message = action.payload.message;
            let dl = Object.assign([], cloneState.productList);
            dl = dl.filter((p: ProductModel) => p.productId !== action.payload.productId);
            cloneState.productList = dl;
            return cloneState;
        case ProductActionType.DELETE_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.UPLOAD:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.UPLOAD_SUCCESS:
            if (!action.payload.skip) {
                cloneState.isLoading = false;
                cloneState.error = null;
                cloneState.message = null;
                let up = Object.assign({}, cloneState.product);
                if (!up.defaultImage) up.defaultImage = action.payload.filename;
                up.imageUrls = Object.assign([], cloneState.product?.imageUrls);            
                up.imageUrls.push(action.payload.filename);
                cloneState.product = up;
            }
            
            return cloneState;
        case ProductActionType.UPLOAD_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.DELETE_IMAGE:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = null;
            return cloneState;
        case ProductActionType.DELETE_IMAGE_SUCCESS:
            cloneState.isLoading = false;
            cloneState.error = null;
            cloneState.message = action.payload.message;
            if (cloneState.product) {
                let cp = Object.assign({}, cloneState.product);
                let durls = Object.assign([], cp.imageUrls);
                durls = durls.filter(url => url !== action.payload.filename);
                cp.imageUrls = durls;
                cloneState.product = cp;
            }
                                
            return cloneState;
        case ProductActionType.DELETE_IMAGE_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.payload.error;
            cloneState.message = null;
            return cloneState;
        default:
            return cloneState;
    }
}