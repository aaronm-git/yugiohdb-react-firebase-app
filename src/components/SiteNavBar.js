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
  return (
    <Navbar expand="lg" className="rounded shadow-lg justify-content-between" variant="dark" bg="dark">
      <Link to="/" className="navbar-brand">
        {process.env.REACT_APP_SITE_TITLE}
      </Link>
      <Form inline className="position-relative" onSubmit={searchTermSubmit}>
        <FormControl type="text" className="mr-sm-2" placeholder="Search" onChange={updateSearchTerm} />
        <Link to={`/search/?q=${searchTerm}`} className="btn btn-outline-warning">
          SEARCH
        </Link>
      </Form>
    </Navbar>
  );
}
