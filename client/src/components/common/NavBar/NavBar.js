//NavBar.js
import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios'
function NavBar() {

  const user = useSelector(state => state.user.userData);
  const isAuthenticated = user && user.isAuth; // user 객체가 정의되어 있는지 확인 후에 isAuth 값에 접근합니다.
  const [expanded, setExpanded] = useState(false);

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
    <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
        >
            <Container>
                <Navbar.Brand href="/">Mija</Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isAuthenticated && (
                            <Nav.Link
                                href="/expenseHistory"
                                onClick={() => setExpanded(false)}
                            >
                                Expense History
                            </Nav.Link>
                        )}
                        {isAuthenticated && (
                            <Nav.Link href="/total" onClick={() => setExpanded(false)}>
                                Total
                            </Nav.Link>
                        )}
                        {isAuthenticated && (
                            <Nav.Link href="/myCard" onClick={() => setExpanded(false)}>
                                My Card
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {!isAuthenticated && (
                            <Nav.Link href="/register" onClick={() => setExpanded(false)}>
                                Register
                            </Nav.Link>
                        )}
                        {isAuthenticated && (
                            <Button
                                variant="outline-light"
                                onClick={() => {
                                    handleLogout();
                                    setExpanded(false);
                                }}
                            >
                                log out
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
}

export default NavBar