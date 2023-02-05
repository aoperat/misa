import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Auth from './hoc/auth'

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

function App() {

  
  const AuthLandingPage = Auth(LandingPage, true);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  //null 아무나 출입가능
  //true 로그인한 유저만 출입 가능
  //false 로그인한 유저는 출입 불가

  return (
    <Router>
        <Routes>
          <Route exact path="/" element = {<AuthLandingPage/> } />
          <Route exact path="/login" element = {<AuthLoginPage/>} />
          <Route exact path="/register" element = {<AuthRegisterPage/> } />
        </Routes>
    </Router>
  );
}

export default App;
