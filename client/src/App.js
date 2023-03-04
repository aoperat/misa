import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Auth from './hoc/auth'

//common
import NavBar from './components/common/NavBar/NavBar';

//page
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import ExpenseHistoryPage from './components/views/ExpenseHistoryPage/ExpenseHistory'
import FixedExpensesPage from './components/views/FixedExpensesPage/FixedExpenses'
import TotalPage from './components/views/TotalPage/Total'
import MyCardPage from './components/views/MyCardPage/MyCard';


function App() {

  
  const AuthLandingPage = Auth(LandingPage, true);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthExpenseHistoryPage = Auth(ExpenseHistoryPage, true);
  const AuthFixedExpensesPage = Auth(FixedExpensesPage, true);
  const AuthTotalPage = Auth(TotalPage, true);
  const AuthMyCardPage = Auth(MyCardPage, true);


  //null 아무나 출입가능
  //true 로그인한 유저만 출입 가능
  //false 로그인한 유저는 출입 불가

  return (
    <div>
      
    <NavBar></NavBar>
    <Router>
        <Routes>
          <Route exact path="/" element = {<AuthLandingPage/> } />
          <Route exact path="/login" element = {<AuthLoginPage/>} />
          <Route exact path="/register" element = {<AuthRegisterPage/> } />
          <Route exact path="/expenseHistory" element = {<AuthExpenseHistoryPage/> } />
          <Route exact path="/fixedExpenses" element = {<AuthFixedExpensesPage/> } />
          <Route exact path="/total" element = {<AuthTotalPage/> } />
          <Route exact path="/myCard" element = {<AuthMyCardPage/> } />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
