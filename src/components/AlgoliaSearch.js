import React from "react";
import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

const searchClient = algoliasearch("A5JPX9U9RD", "bffd80bc0030e6e51457ec77f6ff353c");

export default function AlgoliaSearch() {
  const Hit = ({ hit }) => {
    return (
      <div>
        {/* <Highlight attribute="name" hit={hit} tagName="mark" /> */}
        <Link to={`/card/${hit.objectID}`}>{hit.name}</Link>

        <p className="text-truncate">{hit.description}</p>
      </div>
    );
  };
  return (
    <Row>
      <Col>
        <InstantSearch indexName="cards" searchClient={searchClient}>
          <Row>
            <Col md="3">
              <ClearRefinements />
              <h5>Card Types</h5>
              <RefinementList attribute="_tags" />
              <Configure hitsPerPage={8} />
            </Col>
            <Col md="9">
              <SearchBox />
              <Hits hitComponent={Hit} />
              {/* <Hits /> */}
              <Pagination />
            </Col>
          </Row>
        </InstantSearch>
      </Col>
    </Row>
  );
}
