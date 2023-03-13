//NavBar.js
import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios'
function NavBar() {

  const user = useSelector(state => state.user.userData);
  const isAuthenticated = user && user.isAuth; // user 객체가 정의되어 있는지 확인 후에 isAuth 값에 접근합니다.
  
  const handleLogout = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          window.location.replace('/login')
        } else {
          alert('로그아웃 실패')
        }
      })
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">미자</Navbar.Brand>
        <Nav className="me-auto">
          {isAuthenticated && <Nav.Link href="/expenseHistory">지출내역</Nav.Link>}
          {/* <Nav.Link href="/fixedExpenses">고정비</Nav.Link> */}
          {isAuthenticated && <Nav.Link href="/total">종합</Nav.Link>}

          {isAuthenticated && <Nav.Link href="/myCard">내카드</Nav.Link>}
          {/* <Nav.Link href="#pricing">목표</Nav.Link> */}

        </Nav>
        <Nav>
          {!isAuthenticated && <Nav.Link href="/register">회원가입</Nav.Link>}
          {isAuthenticated && (
            <Button variant="outline-light" onClick={handleLogout}>
              로그아웃
            </Button>
          )}
          {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar