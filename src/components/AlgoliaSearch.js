import React from "react";
import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
  PoweredBy,
  connectSearchBox,
  connectPoweredBy,
} from "react-instantsearch-dom";
import { Row, Col, FormControl } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const searchClient = algoliasearch("A5JPX9U9RD", "bffd80bc0030e6e51457ec77f6ff353c");

export default function AlgoliaSearch({ location }) {
  const getQuery = () => {
    const query = new URLSearchParams(location.search);
    return query.get("q");
  };
  const Hit = ({ hit }) => {
    return (
      <div>
        {/* <Highlight attribute="name" hit={hit} tagName="mark" /> */}
        <Link to={`/card/${hit.objectID}`}>{hit.name}</Link>

        <p className="text-truncate">{hit.description}</p>
      </div>
    );
  };
  const AlgoliaSearchBox = ({ currentRefinement, refine }) => {
    return (
      <div className="position-relative mb-4">
        <Search className="position-absolute text-secondary" style={{ left: "0", margin: "1rem" }} />
        <FormControl
          id="algolia-searchBox"
          aria-label="Large"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
          placeholder="Search card by name"
          size="lg"
          autoFocus
          style={{ paddingLeft: "2.75rem" }}
        />
      </div>
    );
  };

  const CustomSearchBox = connectSearchBox(AlgoliaSearchBox);

  return (
    <Row>
      <Col>
        <InstantSearch indexName="cards" searchClient={searchClient}>
          <Row>
            <Col md="3">
              <ClearRefinements />
              <h5> Card Types</h5>
              <RefinementList attribute="_tags" showMore={true} />
              <h5>Race</h5>
              <RefinementList attribute="race" showMore={true} />
              <h5>Archetype</h5>
              <RefinementList attribute="archetype" showMore={true} />
              <Configure hitsPerPage={8} />
            </Col>
            <Col md="9">
              <CustomSearchBox defaultRefinement={getQuery()} />
              <Hits hitComponent={Hit} />
              <Pagination />
            </Col>
          </Row>
          <PoweredBy className="justify-content-center" />
        </InstantSearch>
      </Col>
    </Row>
  );
}
