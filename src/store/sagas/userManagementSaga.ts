import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USERS } from '../actionTypes/userManagementTypes';
import { IUser } from '../../domain/models/user';
import { getUsers } from '../../services/userService';
import { UserManagementActionCreators } from '../actionCreators/userManagementActionCreators';
import { NotificationHelper } from '../../utils/notificationHelper';

function* loadUsersApiCall() {
  const result: IUser[] = yield call(getUsers);

  if (result) {
    yield put(UserManagementActionCreators.usersLoaded(result));
  } else {
    NotificationHelper.error('Could not retrieve users!');
    yield put(UserManagementActionCreators.usersLoaded([]));
  }
}

function* loadUsersGenerator() {
  yield takeLatest(LOAD_USERS, loadUsersApiCall);
}

export default function* userManagementSaga() {
  yield all([loadUsersGenerator()]);
}
