import React from "react";
import { Navbar } from "react-bootstrap";

export default function SiteFooter() {
  const Environment = () => {
    if (process.env.NODE_ENV === "development") return <h5 className="text-uppercase">{process.env.NODE_ENV}</h5>;
    else return null;
  };
  return (
    <Navbar className="pt-4">
      <div className="row">
        <div className="col-12 col-md text-light">
          <small className="d-block mb-3">© 2020</small>
          <Environment />
        </div>
      </div>
    </Navbar>
  );
}
