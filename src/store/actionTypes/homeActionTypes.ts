import { ActiveSection } from '../../domain/enums/activeSection';

export const SIMPLE_ACTION = 'SIMPLE_ACTION';
export const ASYNC_ACTION_STARTED = 'ASYNC_ACTION_STARTED';
export const ASYNC_ACTION_SUCCEED = 'ASYNC_ACTION_SUCCEED';
export const ASYNC_ACTION_FAILED = 'ASYNC_ACTION_FAILED';
export const SIGNING_UP = 'SIGNING_UP';
export const LOGGING_IN = 'LOGGING_IN';
export const CHANGE_ACTIVE_SECTION = 'CHANGE_ACTIVE_SECTION';

export type SimpleAction = {
  type: typeof SIMPLE_ACTION;
  payload: string;
};

export type AsyncActionStart = {
  type: typeof ASYNC_ACTION_STARTED;
};

export type AsyncActionSucceed = {
  type: typeof ASYNC_ACTION_SUCCEED;
  result: string;
};

export type AsyncActionFailed = {
  type: typeof ASYNC_ACTION_FAILED;
  reason: string;
};

export type SigningUp = {
  type: typeof SIGNING_UP;
  state: boolean;
};

export type LoggingIn = {
  type: typeof LOGGING_IN;
  state: boolean;
};

export type ChangeActiveSection = {
  type: typeof CHANGE_ACTIVE_SECTION;
  secton?: ActiveSection;
};

export type HomeActionTypes =
  | SimpleAction
  | AsyncActionStart
  | AsyncActionSucceed
  | AsyncActionFailed
  | SigningUp
  | LoggingIn
  | ChangeActiveSection;
