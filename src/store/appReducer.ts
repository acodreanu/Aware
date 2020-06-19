import { combineReducers, AnyAction } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { IAppState } from './appState';
import { homeReducer } from './reducers/homeReducer';
import { authReducer } from './reducers/authReducer';
import { SIGN_OUT } from './actionTypes/authActionTypes';
import { userManagementReducer } from './reducers/userManagementReducer';

export const createAppReducer = (history: History) => {
  const reducer = combineReducers<IAppState>({
    router: connectRouter(history),
    authState: authReducer,
    homeState: homeReducer,
    userManagementState: userManagementReducer
  });

  //https://stackoverflow.com/q/35622588/2929249
  //Was based on the approach above, in case of any issues needs to be refactored
  const appReducer = (state: IAppState | undefined, action: AnyAction) => {
    if (action.type === SIGN_OUT) {
      state = undefined;
    }

    return reducer(state, action);
  };

  return appReducer;
};
