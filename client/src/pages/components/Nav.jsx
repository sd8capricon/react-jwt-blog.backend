import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../../App';

function MyNav(){

    return(
        <Navbar variant="dark" bg="dark" className="Nav" expand="md" sticky="top">
          <Navbar.Brand className="Nav-brand" href="/">React-JWT-Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/blogs">Blogs</Nav.Link>
              <Nav.Link href="/admin/login">Admin Login</Nav.Link>
              <Nav.Link href="/admin">Admin Panel</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNav; 