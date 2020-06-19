import DotEnv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import AppContainer from './containers/appContainer/appContainer';
import ErrorBoundaryComponent from './components/errorBoundaryComponent/errorBoundaryComponent';
import { appStore, appHistory } from './store/appStore';
import * as serviceWorker from './utils/serviceWorker';

import 'rsuite/dist/styles/rsuite-default.css';
import './index.scss';

DotEnv.config();

ReactDOM.render(
  <ErrorBoundaryComponent>
    <Provider store={appStore}>
      <ConnectedRouter history={appHistory}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>
  </ErrorBoundaryComponent>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
