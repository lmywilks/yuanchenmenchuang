import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProductState } from "./product.reducers";

export const selectProductState = createFeatureSelector<AppState, ProductState>('product');

export const getProduct = createSelector(selectProductState, (state: ProductState) => state.product);

export const getProductList = createSelector(selectProductState, (state: ProductState) => state.productList);

export const isLoading = createSelector(selectProductState, (state: ProductState) => state.isLoading);