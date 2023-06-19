import React, { useState, useEffect, useReducer, useContext } from 'react';
import Input from '../UI/input/input';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Store/Auth-context';


const emailReducer = (state, action) => {
  if (action.type === 'user_input') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'input_blur') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'user_password') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'input_blur') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  const authctx = useContext(AuthContext);

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const {isValid : emailIsValid} = emailState;
  const {isValid : passwordIsValid} = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid)
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'user_input', val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'user_password', val: event.target.value });

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'input_blur' })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'input_blur' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogIn(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" label="E-mail" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <Input id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
