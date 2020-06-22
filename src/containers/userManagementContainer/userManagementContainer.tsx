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
import AddUserModalComponent from '../../components/addUserModalComponent/addUserModalComponent';
import { IUserForSaving } from '../../domain/models/userForSaving';

export interface IUserManagementContainerProps {
  users?: IUser[];
}

const UserManagementContainer: React.FC<IUserManagementContainerProps> = (props: IUserManagementContainerProps) => {
  const dispatch = useDispatch<Dispatch<AppActionTypes>>();

  const [selected, setSelected] = useState<'Users'>();
  const [addUserOpen, setAddUserOpen] = useState(false);

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
    setAddUserOpen(true);
  };

  const onCloseAddUserModal = () => {
    setAddUserOpen(false);
  };

  const onSaveUser = (user: IUserForSaving) => {
    dispatch(UserManagementActionCreators.saveUser(user));
  };

  const sideContent = () => {
    const usersClass = classNames('UserManagementContainer__option', {
      'UserManagementContainer__option_selected': selected === 'Users'
    });
    const addUserClass = classNames('UserManagementContainer__option');

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
    <>
      <PageWithSidePanelComponent
        sidePanelContent={sideContent()}
        showHistoryBack={true}
        pageContent={selected === 'Users' ? <UsersManagementComponent users={props.users} /> : null}
      />
      <AddUserModalComponent onSubmit={onSaveUser} visible={addUserOpen} onClose={onCloseAddUserModal} />
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    users: state.userManagementState.users
  };
};

export default connect(mapStateToProps)(UserManagementContainer);
