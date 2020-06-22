import { useSelector, useDispatch, connect } from 'react-redux';
import React, { Dispatch } from 'react';
import { Button } from 'rsuite';

import SignupComponent from '../../components/signupComponent/signupComponent';
import { AppActionTypes } from '../../store/appActionTypes';
import { IAppState } from '../../store/appState';
import { AuthActionCreators } from '../../store/actionCreators/authActionsCreators';
import { HomeActionCreators } from '../../store/actionCreators/homeActionCreators';
import LoginComponent from '../../components/loginComponent/loginComponent';

import './homeContainer.scss';
import { RoleType } from '../../domain/enums/roleType';

export interface IHomeContainerProps {
  loggingIn: boolean;
  signingUp: boolean;
  isAuthenticated: boolean;
}

const HomeContainer: React.FC<IHomeContainerProps> = (properties: IHomeContainerProps) => {
  const name = useSelector<IAppState, string>(s => s.authState.user?.email as string);

  const dispatch = useDispatch<Dispatch<AppActionTypes>>();

  const onSignUpClick = () => {
    dispatch(HomeActionCreators.signingUp(!properties.signingUp));
  };

  const onSignInClick = () => {
    dispatch(HomeActionCreators.loggingIn(!properties.loggingIn));
  };

  const onSignUpSubmit = (email: string, password: string, confirmPassword: string) => {
    dispatch(AuthActionCreators.signUp(email, RoleType.Manager, password, confirmPassword));
  };

  const onLoginSubmit = (email: string, password: string) => {
    dispatch(AuthActionCreators.signIn(email, password));
  };

  console.log(properties.isAuthenticated);

  const renderMainPart = () => {
    // if (name) {
    return (
      <>
        <div className="HomeContainer__welcome">
          <h6>Welcome {name}!</h6>
        </div>
        <div className="HomeContainer__buttons">
          {!properties.isAuthenticated ? (
            <>
              <Button className="HomeContainer__button" color="orange" size="lg" onClick={onSignInClick}>
                Login
              </Button>
              <Button className="HomeContainer__button" color="cyan" size="lg" onClick={onSignUpClick}>
                Sign Up
              </Button>
              {properties.signingUp ? <SignupComponent onSubmit={onSignUpSubmit}></SignupComponent> : null}
              {properties.loggingIn ? <LoginComponent onSubmit={onLoginSubmit}></LoginComponent> : null}
            </>
          ) : null}
        </div>
      </>
    );
    // } //else {
    // return (
    // <GoogleLogin
    //   clientId="588601611917-cljbf777480t1rkq6ggfctkmebflmi0k.apps.googleusercontent.com"
    //   buttonText="Sign In with Google"
    //   onFailure={errorHandler}
    //   cookiePolicy={'single_host_origin'}
    //   className="HomeContainer__google-login"
    //   theme="dark"
    // />
    // );
    // }
  };

  return (
    <div className="HomeContainer">
      <div className="HomeContainer__logo">Aware</div>
      {renderMainPart()}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    loggingIn: state.homeState.loggingIn,
    signingUp: state.homeState.signingUp,
    isAuthenticated: state.authState.isAuthenticated
  };
};

export default connect(mapStateToProps)(HomeContainer);
