import React, { useState } from 'react';
import { Input, Button } from 'rsuite';

import './signupComponent.scss';

export interface ISignupComponentProps {
  onSubmit: (name: string, email: string, password: string, confirmPassword: string) => void;
}

const SignupComponent: React.FC<ISignupComponentProps> = (props: ISignupComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitHandler = () => {
    props.onSubmit(email, email, password, confirmPassword);
  };

  return (
    <div className="SignupComponent">
      <div className="SignupComponent__input-group SignupComponent_animated">
        <p className="SignupComponent__label">Email</p>
        <Input className="SignupComponent__input" value={email} onChange={setEmail}></Input>
      </div>
      <div className="SignupComponent__input-group SignupComponent_animated">
        <p className="SignupComponent__label">Password</p>
        <Input type="password" className="SignupComponent__input" value={password} onChange={setPassword}></Input>
      </div>
      <div className="SignupComponent__input-group SignupComponent_animated">
        <p className="SignupComponent__label">Confirm Password</p>
        <Input
          type="password"
          className="SignupComponent__input"
          value={confirmPassword}
          onChange={setConfirmPassword}
        ></Input>
      </div>
      <Button className="SignupComponent__signUp SignupComponent_animated" color="green" onClick={onSubmitHandler}>
        Sign Up!
      </Button>
    </div>
  );
};

export default SignupComponent;
