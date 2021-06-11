import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background: #343a40;
    border-radius: 4px;
  }
  .navbar-brand,
  .navbar-nav,
  .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">login</Nav.Link>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/addoder">เพิ่ม Order</Nav.Link>
          <Nav.Link href="/addaccount">เพิ่ม / ลบ Account</Nav.Link>
          <Nav.Link href="/addcomponent">เพิ่ม / ลบ อุปกรณ์</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
