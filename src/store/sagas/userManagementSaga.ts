import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USERS, SAVE_USER, SaveUser, DELETE_USER, DeleteUser } from '../actionTypes/userManagementTypes';
import { IUser } from '../../domain/models/user';
import { getUsers, saveUser, deleteUser } from '../../services/userService';
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

function* saveUserApiCall(action: SaveUser) {
  const result: IUser = yield call(saveUser, action.user);

  if (result) {
    NotificationHelper.success('User created!');
  } else {
    NotificationHelper.error('Failed to created user!');
  }
}

function* deleteUserApiCall(action: DeleteUser) {
  const result: IUser = yield call(deleteUser, action.email);

  if (result) {
    NotificationHelper.success('User deleted!');
  } else {
    NotificationHelper.error('Failed to delete user!');
  }
}

function* loadUsersGenerator() {
  yield takeLatest(LOAD_USERS, loadUsersApiCall);
}

function* saveUserGenerator() {
  yield takeLatest(SAVE_USER, saveUserApiCall);
}

function* deleteUserGenerator() {
  yield takeLatest(DELETE_USER, deleteUserApiCall);
}

export default function* userManagementSaga() {
  yield all([loadUsersGenerator(), saveUserGenerator(), deleteUserGenerator()]);
}
