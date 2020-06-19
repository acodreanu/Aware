import React, { useState } from 'react';
import { Input, Button } from 'rsuite';

import './loginComponent.scss';

export interface ILoginComponentProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginComponent: React.FC<ILoginComponentProps> = (props: ILoginComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = () => {
    props.onSubmit(email, password);
  };

  return (
    <div className="LoginComponent">
      <div className="LoginComponent__input-group LoginComponent_animated">
        <p className="LoginComponent__label">Email</p>
        <Input className="LoginComponent__input" value={email} onChange={setEmail}></Input>
      </div>
      <div className="LoginComponent__input-group LoginComponent_animated">
        <p className="LoginComponent__label">Password</p>
        <Input className="LoginComponent__input" type="password" value={password} onChange={setPassword}></Input>
      </div>
      <Button className="LoginComponent__logIn LoginComponent_animated" color="green" onClick={onSubmitHandler}>
        Login
      </Button>
    </div>
  );
};

export default LoginComponent;
