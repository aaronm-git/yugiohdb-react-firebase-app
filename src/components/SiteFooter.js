import React from "react";
import { Navbar } from "react-bootstrap";

export default function SiteFooter() {
  return (
    <Navbar className="pt-4">
      <div className="row">
        <div className="col-12 col-md">
          {/* <img className="mb-2" src="" alt="" width="24" height="24"></img> */}
          <small className="d-block mb-3 text-light">© 2020</small>
        </div>
        <div className="col-6 col-md">
          <h5 className="text-secondary">Features</h5>
          {/* <ul className="list-unstyled text-small">
            <li>
              <a className="text-light" href="#">
                Cool stuff
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Random feature
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Team feature
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Stuff for developers
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Another one
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Last time
              </a>
            </li>
          </ul>
        */}
        </div>
        <div className="col-6 col-md">
          <h5 className="text-secondary">Resources</h5>
          {/* <ul className="list-unstyled text-small">
            <li>
              <a className="text-light" href="#">
                Resource
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Resource name
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Another resource
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Final resource
              </a>
            </li>
          </ul>
         */}
        </div>
        <div className="col-6 col-md">
          <h5 className="text-secondary">About</h5>
          {/* <ul className="list-unstyled text-small">
            <li>
              <a className="text-light" href="#">
                Team
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Locations
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Privacy
              </a>
            </li>
            <li>
              <a className="text-light" href="#">
                Terms
              </a>
            </li>
          </ul>
        */}
        </div>
      </div>
    </Navbar>
  );
}
