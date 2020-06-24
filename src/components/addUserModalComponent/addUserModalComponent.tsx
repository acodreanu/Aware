import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'rsuite';

import { IUserForSaving } from '../../domain/models/userForSaving';
import { RoleType } from '../../domain/enums/roleType';
import { IUser } from '../../domain/models/user';

import './addUserModalComponent.scss';

export interface IAddUserModalComponentProps {
  visible: boolean;
  editMode: boolean;
  user?: IUser;
  onClose: () => void;
  onSubmit: (user: IUserForSaving) => void;
}

const AddUserModalComponent: React.FC<IAddUserModalComponentProps> = (props: IAddUserModalComponentProps) => {
  const editEmail = props.user ? (props.editMode ? props.user.email : '') : '';
  const editName = props.user ? (props.editMode ? props.user.name : '') : '';

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(editEmail);
    setName(editName);
  }, [editEmail, editName]);

  const clearState = () => {
    setEmail('');
    setPassword('');
  };

  const submitHandler = () => {
    props.onSubmit({ name: name, email: email, password: password, role: RoleType.Employee });
    props.onClose();
  };

  return (
    <Modal show={props.visible} backdrop={true} size="xs" onHide={props.onClose} onExited={clearState}>
      <Modal.Title>
        Add User
        <hr />
      </Modal.Title>
      <Modal.Header closeButton={true}></Modal.Header>
      <Modal.Body className="AddUserModalComponent__body">
        <div className="AddUserModalComponent__group">
          <label className="AddUserModalComponent__label">Name</label>
          <Input className="AddUserModalComponent__input" value={name} onChange={setName}></Input>
        </div>
        <div className="AddUserModalComponent__group">
          <label className="AddUserModalComponent__label">Email</label>
          <Input
            className="AddUserModalComponent__input"
            value={email}
            disabled={props.editMode}
            onChange={setEmail}
          ></Input>
        </div>
        <div className="AddUserModalComponent__group">
          <label className="AddUserModalComponent__label">Password</label>
          <Input
            className="AddUserModalComponent__input"
            type="Password"
            value={password}
            onChange={setPassword}
            disabled={props.editMode}
          ></Input>
        </div>
        <Button className="AddUserModalComponent__save-button" color="green" onClick={submitHandler}>
          Save
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModalComponent;
