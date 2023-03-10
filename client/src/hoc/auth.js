import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom'


function AuthenticationCheckWrapper(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth())
        .then(response => {
          if(!response.payload.isAuth){
            if(option){
              navigate('/login')
            }
          } else {
            if(adminRoute && !response.payload.isAdmin){
              navigate('/')
            } else {
              if(!option){
                navigate('/')
              }
            }
          }
        })
    }, [dispatch, navigate])

    return (
      <SpecificComponent {...props}/>
    )
  }

  return AuthenticationCheck;
}

export default AuthenticationCheckWrapper;
