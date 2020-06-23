import React from 'react';
import { Icon } from 'rsuite';

import { IUser } from '../../domain/models/user';

import './userItemComponent.scss';

export interface IUserItemComponentProps {
  user: IUser;
  onDelete: (email: string) => void;
  onEdit: (user: IUser) => void;
}

const UserItemComponent: React.FC<IUserItemComponentProps> = (props: IUserItemComponentProps) => {
  const onDeleteHandler = () => {
    props.onDelete(props.user.email);
  };

  const onEditToggleHandler = () => {
    props.onEdit(props.user);
  };

  return (
    <div className="UserItemComponent">
      <p className="UserItemComponent__email">{props.user.email}</p>
      <p className="UserItemComponent__role">{props.user.role}</p>
      <div>
        <Icon className="UserItemComponent__edit-item" icon="edit" onClick={onEditToggleHandler} />
        <Icon className="UserItemComponent__close-icon" icon="close" onClick={onDeleteHandler} />
      </div>
    </div>
  );
};

export default UserItemComponent;
