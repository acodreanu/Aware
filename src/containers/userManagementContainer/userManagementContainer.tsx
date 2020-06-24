import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import classNames from 'classnames';
import openSocket from 'socket.io-client';

import { AppActionTypes } from '../../store/appActionTypes';
import { HomeActionCreators } from '../../store/actionCreators/homeActionCreators';
import { ActiveSection } from '../../domain/enums/activeSection';
import { IAppState } from '../../store/appState';
import { IUser } from '../../domain/models/user';
import { UserManagementActionCreators } from '../../store/actionCreators/userManagementActionCreators';
import PageWithSidePanelComponent from '../../components/pageWithSidePanelComponent/pageWithSidePanelComponent';
import UsersManagementComponent from '../../components/usersManagementComponent/usersManagementComponent';
import AddUserModalComponent from '../../components/addUserModalComponent/addUserModalComponent';
import { IUserForSaving } from '../../domain/models/userForSaving';

import './userManagementContainer.scss';

export interface IUserManagementContainerProps {
  users?: IUser[];
}

const UserManagementContainer: React.FC<IUserManagementContainerProps> = (props: IUserManagementContainerProps) => {
  const dispatch = useDispatch<Dispatch<AppActionTypes>>();

  const [selected, setSelected] = useState<'Users'>();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    dispatch(HomeActionCreators.changeActiveSection(ActiveSection.UserManager));
    const socket = openSocket(process.env.REACT_APP_API_ADDRESS as string);
    socket.on('users', (data: { action: 'create' | 'update'; user: IUser } | { action: 'delete'; email: string }) => {
      if (data.action === 'create') {
        dispatch(UserManagementActionCreators.userSaved(data.user));
      } else if (data.action === 'delete') {
        dispatch(UserManagementActionCreators.userDeleted(data.email));
      } else if (data.action === 'update') {
        dispatch(UserManagementActionCreators.userEdited(data.user));
      }
    });

    return () => {
      HomeActionCreators.changeActiveSection(undefined);
      socket.close();
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
    setUserToEdit(undefined);
  };

  const onCloseAddUserModal = () => {
    setAddUserOpen(false);
  };

  const onSaveUser = (user: IUserForSaving) => {
    if (userToEdit) {
      dispatch(UserManagementActionCreators.editUser(user));
    } else {
      dispatch(UserManagementActionCreators.saveUser(user));
    }
  };

  const onDeleteUser = (email: string) => {
    dispatch(UserManagementActionCreators.deleteUser(email));
  };

  const onEditUser = (user: IUser) => {
    setUserToEdit(user);
    setAddUserOpen(true);
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
        pageContent={
          selected === 'Users' ? (
            <UsersManagementComponent users={props.users} onDeleteUser={onDeleteUser} onEditUser={onEditUser} />
          ) : null
        }
      />
      <AddUserModalComponent
        onSubmit={onSaveUser}
        visible={addUserOpen}
        onClose={onCloseAddUserModal}
        editMode={userToEdit !== undefined}
        user={userToEdit}
      />
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    users: state.userManagementState.users
  };
};

export default connect(mapStateToProps)(UserManagementContainer);
