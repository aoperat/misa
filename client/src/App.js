import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Auth from './hoc/auth'

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import ExpenseHistoryPage from './components/views/ExpenseHistoryPage/ExpenseHistory'
import FixedExpensesPage from './components/views/FixedExpensesPage/FixedExpenses'
import TotalPage from './components/views/TotalPage/Total'
import {Navbar,Container,Nav} from 'react-bootstrap';

function App() {

  
  const AuthLandingPage = Auth(LandingPage, true);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  const AuthExpenseHistoryPage = Auth(ExpenseHistoryPage, true);
  const AuthFixedExpensesPage = Auth(FixedExpensesPage, true);
  const AuthTotalPage = Auth(TotalPage, true);

  //null 아무나 출입가능
  //true 로그인한 유저만 출입 가능
  //false 로그인한 유저는 출입 불가

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">미자</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/expenseHistory">지출내역</Nav.Link>
            <Nav.Link href="/fixedExpenses">고정비</Nav.Link>
            <Nav.Link href="/total">종합</Nav.Link>
            <Nav.Link href="#pricing">목표</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/register">회원가입</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Container>

        
      </Navbar>

    <Router>
        <Routes>
          <Route exact path="/" element = {<AuthLandingPage/> } />
          <Route exact path="/login" element = {<AuthLoginPage/>} />
          <Route exact path="/register" element = {<AuthRegisterPage/> } />
          <Route exact path="/expenseHistory" element = {<AuthExpenseHistoryPage/> } />
          <Route exact path="/fixedExpenses" element = {<AuthFixedExpensesPage/> } />
          <Route exact path="/total" element = {<AuthTotalPage/> } />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
