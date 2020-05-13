import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Form, FormControl, Image } from "react-bootstrap";
import logo from "../yugioh-logo.png"

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
      <Link to="/" className="navbar-brand d-block mx-auto">
        <Image src={logo} alt={process.env.REACT_APP_SITE_TITLE} fluid style={{maxHeight: "4rem"}}/>
      </Link>
      <Form onSubmit={searchTermSubmit} className="w-100 d-flex justify-content-center justify-content-lg-end align-items-center">
        <FormControl type="text" className="w-50 mr-2" placeholder="Search" onChange={updateSearchTerm} style={{maxWidth: "200px"}}/>
        <Link to={`/search/?q=${searchTerm}`} className="btn btn-outline-warning">
          SEARCH
        </Link>
      </Form>
    </Navbar>
  );
}
