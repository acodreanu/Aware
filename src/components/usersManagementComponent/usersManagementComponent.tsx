import React from 'react';
import { IUser } from '../../domain/models/user';

import './usersManagementComponent.scss';
import { Loader } from 'rsuite';
import UserItemComponent from '../userItemComponent/userItemComponent';

interface IUsersManagementComponentProps {
  users?: IUser[];
  onDeleteUser: (email: string) => void;
  onEditUser: (user: IUser) => void;
}

const UsersManagementComponent: React.FC<IUsersManagementComponentProps> = (props: IUsersManagementComponentProps) => {
  return (
    <div className="UsersManagementComponent">
      {props.users !== undefined ? (
        props.users.length === 0 ? (
          'No Users!'
        ) : (
          props.users.map(user => {
            return (
              <UserItemComponent key={user.email} user={user} onDelete={props.onDeleteUser} onEdit={props.onEditUser} />
            );
          })
        )
      ) : (
        <Loader center={true} className="UsersManagementComponent__loader" />
      )}
    </div>
  );
};

export default UsersManagementComponent;
