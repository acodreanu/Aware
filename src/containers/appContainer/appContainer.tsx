import loadable from '@loadable/component';
import React, { useEffect, Dispatch } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Loader } from 'rsuite';

import { CommonConstants } from '../../domain/constants/commonConstants';
import SideMenuComponent from '../../components/sideMenuComponent/sideMenuComponent';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../../store/appState';
import { AppActionTypes } from '../../store/appActionTypes';
import { AuthActionCreators } from '../../store/actionCreators/authActionsCreators';
import { ActiveSection } from '../../domain/enums/activeSection';
import { RoleType } from '../../domain/enums/roleType';

import './appContainer.scss';

const demoContainerLoader = loadable(
  () => import('../demoContainer/demoContainer' /* webpackChunkName: 'demoContainer' */),
  {
    fallback: <Loader center={true} content={'Loading'} />
  }
);

const homeContainerLoader = loadable(
  () => import('../homeContainer/homeContainer' /* webpackChunkName: 'homeContainer' */),
  {
    fallback: <Loader center={true} content={'Loading'} />
  }
);

const userManagementContainerLoader = loadable(
  () => import('../userManagementContainer/userManagementContainer' /* webpackChunkName: 'userManagementContainer' */),
  {
    fallback: <Loader center={true} content={'Loading'} />
  }
);

const multiTabLogoutHandler = (event: StorageEvent) => {
  if (event.key === CommonConstants.AccessToken && event.oldValue && !event.newValue) {
    console.log('multiTabLogoutHandler');
    // signOut();
  }
};

const AppContainer: React.FC = () => {
  const isAuthenticated = useSelector<IAppState, boolean>(s => s.authState.isAuthenticated);
  const roleType = useSelector<IAppState, RoleType | undefined>(s => s.authState.user?.role);
  const activeSection = useSelector<IAppState, ActiveSection | undefined>(s => s.homeState.activeSection);
  // const picture = useSelector<IAppState, string>(s => s.authState.user.pictureUrl as string);

  const dispatch = useDispatch<Dispatch<AppActionTypes>>();

  useEffect(() => {
    window.addEventListener('storage', multiTabLogoutHandler);

    return () => {
      window.removeEventListener('storage', multiTabLogoutHandler);
    };
  }, []);

  const signOut = () => {
    dispatch(AuthActionCreators.signOut());
  };

  return (
    <div className="AppContainer">
      {isAuthenticated && (
        <div className="AppContainer__side-menu">
          <SideMenuComponent onLogoutClick={signOut} activeSection={activeSection} roleType={roleType} />
        </div>
      )}
      <div className="AppContainer__content">
        <Switch>
          <Route exact={true} path="/user-management" component={userManagementContainerLoader} />
          <Route exact={true} path="/example" component={demoContainerLoader} />
          <Route exact={true} path="/" component={homeContainerLoader} />
        </Switch>
      </div>
    </div>
  );
};

export default AppContainer;
