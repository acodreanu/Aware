import {
  ASYNC_ACTION_FAILED,
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_SUCCEED,
  SIMPLE_ACTION,
  SimpleAction,
  AsyncActionStart,
  AsyncActionFailed,
  AsyncActionSucceed,
  SigningUp,
  SIGNING_UP,
  LoggingIn,
  LOGGING_IN,
  ChangeActiveSection,
  CHANGE_ACTIVE_SECTION
} from '../actionTypes/homeActionTypes';
import { ActiveSection } from '../../domain/enums/activeSection';

const simpleAction = (value: string): SimpleAction => {
  return {
    type: SIMPLE_ACTION,
    payload: value
  };
};

const asyncActionStarted = (): AsyncActionStart => {
  return {
    type: ASYNC_ACTION_STARTED
  };
};

const asyncActionFailed = (reason: string): AsyncActionFailed => {
  return {
    type: ASYNC_ACTION_FAILED,
    reason: reason
  };
};

const asyncActionSucceed = (result: string): AsyncActionSucceed => {
  return {
    type: ASYNC_ACTION_SUCCEED,
    result: result
  };
};

const signingUp = (state: boolean): SigningUp => {
  return {
    type: SIGNING_UP,
    state: state
  };
};

const loggingIn = (state: boolean): LoggingIn => {
  return {
    type: LOGGING_IN,
    state: state
  };
};

const changeActiveSection = (section?: ActiveSection): ChangeActiveSection => {
  return {
    type: CHANGE_ACTIVE_SECTION,
    secton: section
  };
};

export const HomeActionCreators = {
  simpleAction,
  asyncActionStarted,
  asyncActionFailed,
  asyncActionSucceed,
  signingUp,
  loggingIn,
  changeActiveSection
};
