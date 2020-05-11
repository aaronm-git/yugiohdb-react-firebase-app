import React from "react";
import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
  PoweredBy,
  connectSearchBox,
  connectHits,
} from "react-instantsearch-dom";
import { Row, Col, FormControl, Card, CardColumns } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const searchClient = algoliasearch("A5JPX9U9RD", "bffd80bc0030e6e51457ec77f6ff353c");

export default function AlgoliaSearch({ location }) {
  const getQuery = () => {
    const query = new URLSearchParams(location.search);
    return query.get("q");
  };

  const Hits = ({ hits }) => {
    return (
      <CardColumns>
        {hits.map((hit) => (
          <Card key={hit.objectID} className="shadow-sm">
            <div
              style={{
                height: "200px",
                backgroundImage: `url(${hit.imageURLs.full}), url('https://storage.cloud.google.com/yugiohdb-app.appspot.com/cards/default.jpg')`,
                backgroundRepeat: "none",
                backgroundSize: "cover",
              }}
            />
            <Card.ImgOverlay
              className="py-1 text-white"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "2rem", top: "168px" }}
            >
              <div>
                {typeof hit.atk === "number" && typeof hit.def === "number" ? (
                  <p>
                    {hit.atk}/{hit.def}
                  </p>
                ) : (
                  <p>{hit.race}</p>
                )}
              </div>
            </Card.ImgOverlay>
            <Card.Body>
              <Card.Title>
                <Link to={`/card/${hit.objectID}`}>{hit.name}</Link>
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
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
  const CustomHits = connectHits(Hits);

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
              <CustomHits />
              <Pagination />
            </Col>
          </Row>
          <PoweredBy className="justify-content-center" />
        </InstantSearch>
      </Col>
    </Row>
  );
}
