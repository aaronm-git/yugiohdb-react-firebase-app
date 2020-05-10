import React from "react";

import { Navbar, Nav, Image } from "react-bootstrap";

export default function SiteFooter() {
  const Environment = () => {
    if (process.env.NODE_ENV === "development") return <h5 className="text-uppercase">{process.env.NODE_ENV}</h5>;
    else return null;
  };
  return (
    <Navbar bg="dark" variant="dark" className="text-white">
      <Nav className="mr-auto">
        <small className="d-block mb-3">© 2020</small>
      </Nav>
      <Environment />
    </Navbar>
  );
}
