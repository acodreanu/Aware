import React, { useState } from 'react';
import { Modal, Input, Button } from 'rsuite';

import { IUserForSaving } from '../../domain/models/userForSaving';

import './addUserModalComponent.scss';
import { RoleType } from '../../domain/enums/roleType';

export interface IAddUserModalComponentProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (user: IUserForSaving) => void;
}

const AddUserModalComponent: React.FC<IAddUserModalComponentProps> = (props: IAddUserModalComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    props.onSubmit({ email: email, password: password, role: RoleType.Employee });
  };

  const clearState = () => {
    setEmail('');
    setPassword('');
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
          <label className="AddUserModalComponent__label">Email</label>
          <Input className="AddUserModalComponent__input" value={email} onChange={setEmail}></Input>
        </div>
        <div className="AddUserModalComponent__group">
          <label className="AddUserModalComponent__label">Password</label>
          <Input
            className="AddUserModalComponent__input"
            type="Password"
            value={password}
            onChange={setPassword}
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
