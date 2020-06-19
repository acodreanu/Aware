import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { SIGN_UP, SignUp, SIGN_IN, SignIn, SIGN_OUT } from '../actionTypes/authActionTypes';
import { signUp, login } from '../../services/userService';
import { NotificationHelper } from '../../utils/notificationHelper';
import { IUser } from '../../domain/models/user';
import { HomeActionCreators } from '../actionCreators/homeActionCreators';
import { IJwtToken } from '../../domain/models/jwtToken';
import { CommonConstants } from '../../domain/constants/commonConstants';
import { AuthActionCreators } from '../actionCreators/authActionsCreators';
import { IAppState } from '../appState';
import { push } from 'connected-react-router';

function* signOut() {
  yield call([localStorage, localStorage.removeItem], CommonConstants.AccessToken);
  // yield put(push(urlHelper.routes.root));
  yield put(push('/'));
  NotificationHelper.success('Logged out!');
}

function* checkUserInfo() {
  const token: string = yield call([localStorage, localStorage.getItem], CommonConstants.AccessToken);

  if (token === null) {
    const location = yield select((state: IAppState) => state.router.location.pathname);
    if (location !== '/') {
      yield put(push('/'));
    }
    return;
  }

  const profile: IJwtToken = yield call(jwtDecode, token);
  const now: number = yield call(Date.now);

  if (profile.exp * 1000 < now) {
    yield signOut();
    return;
  }

  yield put(
    AuthActionCreators.userProfileLoaded({
      email: profile.email,
      id: profile.id,
      role: profile.role
    })
  );
}

function* signUpApiCall(action: SignUp) {
  const result: IUser = yield call(signUp, action.email, action.password, action.confirmPassword);

  if (result) {
    NotificationHelper.success('User created!');
    yield put(HomeActionCreators.signingUp(false));
  }
}

function* signInApiCall(action: SignIn) {
  const accessToken: string = yield call(login, action.email, action.password);

  if (accessToken) {
    NotificationHelper.success('Logged In!');
    yield call([localStorage, localStorage.setItem], CommonConstants.AccessToken, accessToken);
    yield put(HomeActionCreators.loggingIn(false));

    yield checkUserInfo();
  }
}

// function* checkUserInfoPeriodically() {
//   const each30Minutes = 30 * 60 * 1000;
//   yield throttle();
// }

function* signUpGenerator() {
  yield takeLatest(SIGN_UP, signUpApiCall);
}

function* signInGenerator() {
  yield takeLatest(SIGN_IN, signInApiCall);
}

function* signOutGenerator() {
  yield takeLatest(SIGN_OUT, signOut);
}

export default function* authSaga() {
  yield all([signUpGenerator(), signOutGenerator(), signInGenerator(), checkUserInfo()]);
}
