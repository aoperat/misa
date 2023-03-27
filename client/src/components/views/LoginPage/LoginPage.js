import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'
import styles from './LoginPage.module.css';

function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");


  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
    }

  const onSubmitHandler = (event) => {
    //preventDefault 사용하면 리프레시가 되지 않는다.
    event.preventDefault();

    // console.log(`Email:${Email}`)
    // console.log(`Password:${Password}`)

    let body ={
      email: Email,
      password: Password
    }

    //리덕스 사용
    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/')
        } else {
          alert('Error')
        }
      })

  }
  
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <label className={styles.label}>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} className={styles.input} />

        <label className={styles.label}>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} className={styles.input} />

        <button className={styles.button}>Sign in</button>
      </form>
    </div>
  );

}

export default LoginPage