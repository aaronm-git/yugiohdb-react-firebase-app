import React from "react";
import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  ClearRefinements,
  RefinementList,
  Configure,
  PoweredBy,
  connectSearchBox,
  connectHits,
  connectPagination,
} from "react-instantsearch-dom";
import { Row, Col, FormControl, Card, CardColumns, Pagination } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const searchClient = algoliasearch("A5JPX9U9RD", "bffd80bc0030e6e51457ec77f6ff353c");

export default function AlgoliaSearch({ location }) {
  const getQuery = () => {
    const query = new URLSearchParams(location.search);
    return query.get("q");
  };

  const AlgoliaHits = ({ hits }) => {
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

  const AlgoliaPagination = ({ currentRefinement, nbPages, refine }) => {
    console.log(currentRefinement);

    const left = [
        currentRefinement - 3 > 0 ? "..." : null,
        currentRefinement - 2 > 0 ? currentRefinement - 2 : null,
        currentRefinement - 1 > 0 ? currentRefinement - 1 : null,
      ],
      right = [
        currentRefinement + 1 <= nbPages ? currentRefinement + 1 : null,
        currentRefinement + 2 <= nbPages ? currentRefinement + 2 : null,
        currentRefinement + 3 <= nbPages ? "..." : null,
      ],
      range = ["First", "Prev", ...left, currentRefinement, ...right, "Next", "Last"].filter((i) => i !== null);
    console.log(range);
    return (
      <Pagination size="lg" className="justify-content-center">
        {/* {range.map((el, i) => (
          <Pagination.Item active={currentRefinement === el}>{el}</Pagination.Item>
        ))} */}
        {range.map((page) => {
          let jumpTo;
          switch (page) {
            case "First":
              jumpTo = 1;
              break;
            case "Prev":
              jumpTo = currentRefinement - 1;
              break;
            case "Next":
              jumpTo = currentRefinement + 1;
              break;
            case "Last":
              jumpTo = nbPages;
              break;
            default:
              jumpTo = 1;
              break;
          }
          return (
            <Pagination.Item
              active={page === currentRefinement}
              className={page === "..." ? "disabled" : ""}
              key={`algoliaPage-${page}`}
              onClick={(event) => {
                event.preventDefault();
                refine(jumpTo);
              }}
            >
              {page}
            </Pagination.Item>
          );
        })}
      </Pagination>
    );
  };

  const CustomSearchBox = connectSearchBox(AlgoliaSearchBox);
  const CustomHits = connectHits(AlgoliaHits);
  const CustomPagination = connectPagination(AlgoliaPagination);

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
              <CustomPagination />
            </Col>
          </Row>
          <PoweredBy className="justify-content-center" />
        </InstantSearch>
      </Col>
    </Row>
  );
}
