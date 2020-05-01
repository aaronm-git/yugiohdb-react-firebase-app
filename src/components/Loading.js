import React from "react";
import { Spinner } from "react-bootstrap";

export default () => {
  return (
    <div className="text-center my-3">
      <Spinner animation="border" role="status" variant="warning">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};
