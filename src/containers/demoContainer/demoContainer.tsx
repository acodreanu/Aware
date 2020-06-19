import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Input } from 'rsuite';

import PageWithSidePanelComponent from '../../components/pageWithSidePanelComponent/pageWithSidePanelComponent';
import { HomeActionCreators } from '../../store/actionCreators/homeActionCreators';
import { AppActionTypes } from '../../store/appActionTypes';
import { IAppState } from '../../store/appState';
import { IHomeState } from '../../store/states/homeState';
import { NotificationHelper } from '../../utils/notificationHelper';

import logo from './logo.svg';

import './demoContainer.scss';

const DemoContainer: React.FC = () => {
  const notificationTitle = 'Notificaiton title';
  const notificationBody = <strong>Notification body</strong>;
  const [value, setValue] = useState<string>('');
  const homeState = useSelector<IAppState, IHomeState>(s => s.homeState);
  const dispatch = useDispatch<Dispatch<AppActionTypes>>();

  const onTextChange = (value: string) => {
    setValue(value);
  };

  const invokeSyncAction = () => {
    dispatch(HomeActionCreators.simpleAction(value));
    setValue('');
  };

  const invokeAsyncAction = () => {
    dispatch(HomeActionCreators.asyncActionStarted());
  };

  const invokeInfoNotification = () => NotificationHelper.info(notificationTitle, notificationBody);
  const invokeSuccessNotification = () => NotificationHelper.success(notificationTitle, notificationBody);
  const invokeWarningNotification = () => NotificationHelper.warning(notificationTitle, notificationBody);
  const invokeErrorNotification = () => NotificationHelper.error(notificationTitle, notificationBody);

  const tryRenderAsyncResult = (): JSX.Element => {
    if (homeState.asyncResult) {
      return <strong id="async-result">{`Async call result is: ${homeState.asyncResult}`}</strong>;
    }

    if (homeState.asyncError) {
      return <strong id="async-error">{`Async call error is: ${homeState.asyncError}`}</strong>;
    }

    return <div>Not called yet</div>;
  };

  return (
    <PageWithSidePanelComponent
      showHistoryBack={false}
      title="Demo Page"
      sidePanelContent={<h2 style={{ textAlign: 'center', padding: '10px', color: '#fff' }}>Demo Content</h2>}
      pageContent={
        <div className="DemoContainer">
          <header className="DemoContainer__header">
            <img src={logo} className="DemoContainer__logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a className="DemoContainer__link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
            <div>
              <hr />
              <strong>Current Redux value: {homeState.simpleValue}</strong>
              <hr />
              <Input onChange={onTextChange} placeholder={'Set value here'} value={value} />
              <hr />
              <Button id="sync" onClick={invokeSyncAction}>
                Update value
              </Button>
              <hr />
              <Button id="async" onClick={invokeAsyncAction}>
                Invoke async action
              </Button>
              <hr />
              {tryRenderAsyncResult()}
              <hr />
              <div>
                <Button id="raise-info" color="blue" onClick={invokeInfoNotification}>
                  Raise Info notifications
                </Button>
                <Button id="raise-success" color="green" onClick={invokeSuccessNotification}>
                  Raise Success notifications
                </Button>
                <Button id="raise-warning" color="yellow" onClick={invokeWarningNotification}>
                  Raise Warning notifications
                </Button>
                <Button id="raise-error" color="red" onClick={invokeErrorNotification}>
                  Raise Error notifications
                </Button>
                <Button id="clear-notifications" color="cyan" onClick={NotificationHelper.closeAll}>
                  Close notifications
                </Button>
              </div>
            </div>
          </header>
        </div>
      }
    />
  );
};

export default DemoContainer;
