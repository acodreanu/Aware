import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { AppActionTypes } from '../../store/appActionTypes';
import { HomeActionCreators } from '../../store/actionCreators/homeActionCreators';
import { ActiveSection } from '../../domain/enums/activeSection';
import { IAppState } from '../../store/appState';
import { IUser } from '../../domain/models/user';
import { UserManagementActionCreators } from '../../store/actionCreators/userManagementActionCreators';
import PageWithSidePanelComponent from '../../components/pageWithSidePanelComponent/pageWithSidePanelComponent';

import './userManagementContainer.scss';
import classNames from 'classnames';
import UsersManagementComponent from '../../components/usersManagementComponent/usersManagementComponent';

export interface IUserManagementContainerProps {
  users?: IUser[];
}

const UserManagementContainer: React.FC<IUserManagementContainerProps> = (props: IUserManagementContainerProps) => {
  const dispatch = useDispatch<Dispatch<AppActionTypes>>();

  const [selected, setSelected] = useState<'Users' | 'AddUser'>();

  useEffect(() => {
    dispatch(HomeActionCreators.changeActiveSection(ActiveSection.UserManager));

    return () => {
      HomeActionCreators.changeActiveSection(undefined);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(UserManagementActionCreators.loadUsers());
  }, [dispatch, selected]);

  const usersClicked = () => {
    setSelected('Users');
  };

  const addUserClicked = () => {
    setSelected('AddUser');
  };

  const sideContent = () => {
    const usersClass = classNames('UserManagementContainer__option', {
      'UserManagementContainer__option_selected': selected === 'Users'
    });
    const addUserClass = classNames('UserManagementContainer__option', {
      'UserManagementContainer__option_selected': selected === 'AddUser'
    });

    return (
      <div className="UserManagementContainer__side-content">
        <p className={usersClass} onClick={usersClicked}>
          Users
        </p>
        <p className={addUserClass} onClick={addUserClicked}>
          Add User
        </p>
      </div>
    );
  };

  return (
    // <div className="UserManagementContainer">
    //   <h4>Users</h4>
    //   {props.users.map(user => {
    //     return <p key={user.email}>{user.email}</p>;
    //   })}
    // </div>
    <PageWithSidePanelComponent
      sidePanelContent={sideContent()}
      showHistoryBack={true}
      pageContent={selected === 'Users' ? <UsersManagementComponent users={props.users} /> : null}
    />
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    users: state.userManagementState.users
  };
};

export default connect(mapStateToProps)(UserManagementContainer);
