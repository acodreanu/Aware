import React from 'react';
import { IUser } from '../../domain/models/user';

import './usersManagementComponent.scss';
import { Loader } from 'rsuite';

interface IUsersManagementComponentProps {
  users?: IUser[];
}

const UsersManagementComponent: React.FC<IUsersManagementComponentProps> = (props: IUsersManagementComponentProps) => {
  return (
    <div className="UsersManagementComponent">
      {props.users !== undefined ? (
        props.users.length === 0 ? (
          'No Users!'
        ) : (
          props.users.map(user => {
            return <div key={user.email}>{user.email}</div>;
          })
        )
      ) : (
        <Loader center={true} className="UsersManagementComponent__loader" />
      )}
    </div>
  );
};

export default UsersManagementComponent;
