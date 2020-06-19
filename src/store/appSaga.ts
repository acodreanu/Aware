import { all } from 'redux-saga/effects';

import homeSaga from './sagas/homeSaga';
import authSaga from './sagas/authSaga';
import userManagementSaga from './sagas/userManagementSaga';

export default function* appSaga() {
  yield all([homeSaga(), authSaga(), userManagementSaga()]);
}
