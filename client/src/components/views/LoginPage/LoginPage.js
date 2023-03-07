import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'


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
    <div style={{
      display: 'flex',justifyContent:'center', alignItems: 'center',width: '100%', height: '100vh'
    }}>
      
      <form style={{display:'flex', flexDirection:'column'}}
      onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <button>로그인</button>
      </form>

    </div>
  )
}

export default LoginPage