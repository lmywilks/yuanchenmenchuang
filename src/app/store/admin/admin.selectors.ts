import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AdminState } from "./admin.reducers";

export const selectAdminState = createFeatureSelector<AppState, AdminState>('admin');

export const getToken = createSelector(selectAdminState, (state: AdminState)=> state.token);
