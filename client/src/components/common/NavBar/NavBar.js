import React from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">미자</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/expenseHistory">지출내역</Nav.Link>
            {/* <Nav.Link href="/fixedExpenses">고정비</Nav.Link> */}
            <Nav.Link href="/total">종합</Nav.Link>

            <Nav.Link href="/myCard">내카드</Nav.Link>
            {/* <Nav.Link href="#pricing">목표</Nav.Link> */}

          </Nav>
          <Nav>
            <Nav.Link href="/register">회원가입</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar