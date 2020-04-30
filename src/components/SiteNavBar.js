import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";

export default function SiteNavBar() {
  return (
    <Navbar bg="light" expand="lg" className="rounded shadow-lg">
      <Navbar.Brand href="#home">{process.env.REACT_APP_SITE_TITLE}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/card" className="nav-link">
              Card
            </Link>
          </li>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
