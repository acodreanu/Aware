import { all, call, put, takeEvery } from 'redux-saga/effects';

import { IWeatherForecastResponseModel } from '../../services/responseModels/weatherForecast/weatherForecastResponseModel';
import { getWeatherForecast } from '../../services/weatherForecastService';
import { HomeActionCreators } from '../actionCreators/homeActionCreators';
import { ASYNC_ACTION_STARTED } from '../actionTypes/homeActionTypes';

function* loadAsyncData() {
  try {
    const rnd = (yield call(Math.random)) * 10;
    if (rnd < 3) {
      const reason = `RND MADE THIS FAIL: ${rnd}`;
      throw new Error(reason);
    } else {
      const result: IWeatherForecastResponseModel[] = yield call(getWeatherForecast);
      const value = result[0].summary;
      yield put(HomeActionCreators.asyncActionSucceed(value));
    }
  } catch (error) {
    yield put(HomeActionCreators.asyncActionFailed(error.message));
  }
}

function* asyncActionStart() {
  yield takeEvery(ASYNC_ACTION_STARTED, loadAsyncData);
}

export default function* homeSaga() {
  yield all([asyncActionStart()]);
}
