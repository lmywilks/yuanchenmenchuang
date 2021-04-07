import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { InfoState } from "./info.reducers";

export const selectInfoState = createFeatureSelector<AppState, InfoState>('info');

export const getInfo = createSelector(selectInfoState, (state: InfoState) => state.info);

export const isLoading = createSelector(selectInfoState, (state: InfoState) => state.isLoading);
