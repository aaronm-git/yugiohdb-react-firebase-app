import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Form, FormControl, Nav } from "react-bootstrap";

export default function SiteNavBar() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState("");
  const updateSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const searchTermSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${searchTerm}`);
  };
  console.log(searchTerm);
  return (
    <Navbar bg="light" expand="lg" className="rounded shadow-lg bg-dark" variant="dark">
      <Link to="/" className="navbar-brand">
        {process.env.REACT_APP_SITE_TITLE}
      </Link>

      <Form inline className="position-relative" onSubmit={searchTermSubmit}>
        <FormControl type="text" className="mr-sm-2" placeholder="Search" onChange={updateSearchTerm} />
        <Link to={`/search/?q=${searchTerm}`} className="btn btn-outline-warning">
          Search
        </Link>
      </Form>
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
      </Navbar.Collapse>
    </Navbar>
  );
}
