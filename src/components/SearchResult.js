import React from "react";
import { Row, Col } from "react-bootstrap";

import CardDetails from "./CardDetails";

export default function SearchResult({ card }) {
  return (
    <Row className="justify-content-md-center">
      <Col className="text-center py-3">
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/616KVG%2B6InL._AC_.jpg"
          alt={card.name}
          className=""
          style={{ maxWidth: "100%", maxHeight: "400px" }}
        />
      </Col>
      <Col md="8" lg="5">
        <CardDetails card={card} />
      </Col>
      <Col md="12" lg="3" className="text-center py-3">
        Card Stats
      </Col>
    </Row>
  );
}
