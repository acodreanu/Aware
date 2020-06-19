import {
  ASYNC_ACTION_FAILED,
  ASYNC_ACTION_SUCCEED,
  HomeActionTypes,
  SIMPLE_ACTION,
  SIGNING_UP,
  LOGGING_IN,
  CHANGE_ACTIVE_SECTION
} from '../actionTypes/homeActionTypes';
import { IHomeState, initialHomeState } from '../states/homeState';

export const homeReducer = (state: IHomeState = initialHomeState, action: HomeActionTypes): IHomeState => {
  switch (action.type) {
    case SIMPLE_ACTION: {
      return {
        ...state,
        simpleValue: action.payload
      };
    }
    case ASYNC_ACTION_SUCCEED: {
      return {
        ...state,
        asyncResult: action.result,
        asyncError: ''
      };
    }
    case ASYNC_ACTION_FAILED: {
      return {
        ...state,
        asyncError: action.reason,
        asyncResult: ''
      };
    }
    case SIGNING_UP: {
      return {
        ...state,
        signingUp: action.state,
        loggingIn: false
      };
    }
    case LOGGING_IN: {
      return {
        ...state,
        signingUp: false,
        loggingIn: action.state
      };
    }
    case CHANGE_ACTIVE_SECTION: {
      return {
        ...state,
        activeSection: action.secton
      };
    }
    default:
      return state;
  }
};
