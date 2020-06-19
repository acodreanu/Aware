import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { EnvironmentHelper } from '../utils/environmentHelper';

import { AppActionTypes } from './appActionTypes';
import { createAppReducer } from './appReducer';
import appSaga from './appSaga';
import { IAppState } from './appState';

export const appHistory = createBrowserHistory();
const appReducer = createAppReducer(appHistory);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [routerMiddleware(appHistory), sagaMiddleware];
const baseEnhancer = applyMiddleware(...middlewares);
let effectiveEnhancer: StoreEnhancer;

if (EnvironmentHelper.isDevelopment()) {
  effectiveEnhancer = composeWithDevTools(baseEnhancer);
} else {
  effectiveEnhancer = baseEnhancer;
}

export const appStore = createStore<IAppState, AppActionTypes, {}, {}>(appReducer, effectiveEnhancer);

sagaMiddleware.run(appSaga);
