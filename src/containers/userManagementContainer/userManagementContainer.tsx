import React, { Dispatch, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { AppActionTypes } from '../../store/appActionTypes';
import { HomeActionCreators } from '../../store/actionCreators/homeActionCreators';
import { ActiveSection } from '../../domain/enums/activeSection';
import { IAppState } from '../../store/appState';
import { IUser } from '../../domain/models/user';
import { UserManagementActionCreators } from '../../store/actionCreators/userManagementActionCreators';

export interface IUserManagementContainerProps {
  users: IUser[];
}

const UserManagementContainer: React.FC<IUserManagementContainerProps> = (props: IUserManagementContainerProps) => {
  const dispatch = useDispatch<Dispatch<AppActionTypes>>();

  useEffect(() => {
    dispatch(HomeActionCreators.changeActiveSection(ActiveSection.UserManager));
    console.log('here1');
    dispatch(UserManagementActionCreators.loadUsers());
  }, [dispatch]);

  return (
    <div>
      {props.users.map(user => {
        return <p key={user.email}>{user.email}</p>;
      })}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    users: state.userManagementState.users
  };
};

export default connect(mapStateToProps)(UserManagementContainer);
