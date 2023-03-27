import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'
import styles from './RegisterPage.module.css';


function RegisterPage() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  
  

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    //preventDefault 사용하면 리프레시가 되지 않는다.
    event.preventDefault();

    if(Password !== ConfirmPassword){
      return alert('비밀번호가 일치하지 않습니다.')
    }

    // console.log(`Email:${Email}`)
    // console.log(`Password:${Password}`)
    let body ={
      name: Name,
      email: Email,
      password: Password
    }

    //리덕스 사용
    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          navigate('/login')
        }else{
          alert('Error')
        }
      })

  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <label className={styles.label}>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} className={styles.input} />

        <label className={styles.label}>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} className={styles.input} />

        <label className={styles.label}>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} className={styles.input} />

        <label className={styles.label}>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} className={styles.input} />

        <button className={styles.button}>Sign up</button>
      </form>
    </div>
  );

}

export default RegisterPage


