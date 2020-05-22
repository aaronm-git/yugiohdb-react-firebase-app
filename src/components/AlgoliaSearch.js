import React from "react";
import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  ClearRefinements,
  connectHierarchicalMenu,
  Configure,
  PoweredBy,
  connectSearchBox,
  connectHits,
  connectPagination,
} from "react-instantsearch-dom";
import {
  Row,
  Col,
  FormControl,
  Card,
  CardDeck,
  Pagination,
  Badge
} from "react-bootstrap";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleLeft,
  ChevronDoubleRight,
} from "react-bootstrap-icons";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_PUBLIC_KEY
);

export default function AlgoliaSearch({ location, selectThisCard }) {
  const getQuery = () => {
    const query = new URLSearchParams(location.search);
    return query.get("q");
  };

  const AlgoliaHits = ({ hits }) => {
    return (
      <CardDeck>
        {hits.map((hit) => (
          <Card
            key={hit.objectID}
            className="shadow-sm mb-3 mx-auto"
            style={{ minWidth: "200px", maxWidth: "200px" }}
          >
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
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                height: "2rem",
                top: "168px",
              }}
            >
              <div>
                {typeof hit.atk === "number" && typeof hit.def === "number" ? (
                  <div className="d-flex justify-content-between">
                    <span>{hit.atk}/{hit.def}</span>
                    <span>{hit.type.lvl2? hit.type.lvl2.substring(hit.type.lvl2.lastIndexOf(" ")): hit.type.lvl0}</span>
                  </div>
                ) : (
                <span>{hit.type.lvl0}/{hit.race}</span>
                )}
              </div>
            </Card.ImgOverlay>
            <Card.Body>
              <Card.Title>
                <Link
                  to={`/card/${hit.objectID}`}
                  onClick={() => selectThisCard(hit)}
                >
                  {hit.name}
                </Link>
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    );
  };
  const AlgoliaSearchBox = ({ currentRefinement, refine }) => {
    return (
      <div className="position-relative mb-4">
        <Search
          className="position-absolute text-secondary"
          style={{ left: "0", margin: "1rem" }}
        />
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
    const left = [
        currentRefinement - 1 > 0 ? "First" : null,
        currentRefinement - 1 > 0 ? "Prev" : null,
        currentRefinement - 3 > 0 ? "..." : null,
        currentRefinement - 2 > 0 ? currentRefinement - 2 : null,
        currentRefinement - 1 > 0 ? currentRefinement - 1 : null,
      ],
      right = [
        currentRefinement + 1 <= nbPages ? currentRefinement + 1 : null,
        currentRefinement + 2 <= nbPages ? currentRefinement + 2 : null,
        currentRefinement + 3 <= nbPages ? "..." : null,
        currentRefinement + 1 <= nbPages ? "Next" : null,
        currentRefinement + 1 <= nbPages ? "Last" : null,
      ],
      range = [...left, currentRefinement, ...right].filter((i) => i !== null);

    const MobilePagination = () => {
      return (
        <Pagination size="lg" className="justify-content-center d-lg-none">
          {currentRefinement - 1 > 0 ? (
            <Pagination.Item
              onClick={(event) => {
                event.preventDefault();
                refine(currentRefinement - 1);
              }}
            >
              <ChevronLeft />
            </Pagination.Item>
          ) : (
            ""
          )}
          <Pagination.Item
            key={`algoliaPage-${currentRefinement}-mobile`}
            active
          >
            {currentRefinement}
          </Pagination.Item>
          {currentRefinement + 1 < nbPages ? (
            <Pagination.Item
              onClick={(event) => {
                event.preventDefault();
                refine(currentRefinement + 1);
              }}
            >
              <ChevronRight />
            </Pagination.Item>
          ) : (
            ""
          )}
        </Pagination>
      );
    };
    return (
      <>
        <Pagination
          size="lg"
          className="justify-content-end d-none d-lg-flex"
        >
          {range.map((page) => {
            let jumpTo;
            let name;
            switch (page) {
              case "First":
                jumpTo = 1;
                name = <ChevronDoubleLeft />;
                break;
              case "Prev":
                jumpTo = currentRefinement - 1;
                name = <ChevronLeft />;
                break;
              case "Next":
                jumpTo = currentRefinement + 1;
                name = <ChevronRight />;
                break;
              case "Last":
                jumpTo = nbPages;
                name = <ChevronDoubleRight />;
                break;
              default:
                jumpTo = page;
                name = page;
                break;
            }
            return (
              <Pagination.Item
                className={`${page === "..." ? "disabled" : ""}`}
                active={page === currentRefinement}
                key={`algoliaPage-${page}`}
                onClick={(event) => {
                  event.preventDefault();
                  refine(jumpTo);
                }}
              >
                {name}
              </Pagination.Item>
            );
          })}
        </Pagination>
        <MobilePagination />
      </>
    );
  };
  const HierarchicalMenu = ({ items, refine, createURL }) => (
    <ul>
      {items.map(item => (
        <li key={item.label}>
          <a
            href={createURL(item.value)}
            style={{ fontWeight: item.isRefined ? 'bold' : '' }}
            onClick={event => {
              event.preventDefault();
              refine(item.value);
            }}
            className="text-decoration-none"
          >
            {item.label} <Badge variant="warning">{item.count}</Badge>
          </a>
          {item.items && (
            <HierarchicalMenu
              items={item.items}
              refine={refine}
              createURL={createURL}
            />
          )}
        </li>
      ))}
    </ul>
  );
  
  
  const CustomSearchBox = connectSearchBox(AlgoliaSearchBox);
  const CustomHits = connectHits(AlgoliaHits);
  const CustomPagination = connectPagination(AlgoliaPagination);
  const CustomHierarchicalMenu = connectHierarchicalMenu(HierarchicalMenu);

  return (
    <Row>
      <Col>
        <InstantSearch indexName="cards" searchClient={searchClient}>
          <Row>
            <Col md="3">
              <ClearRefinements />
              <h5> Card Types</h5>
              <CustomHierarchicalMenu
                attributes={[
                  'type.lvl0',
                  'type.lvl1',
                  'type.lvl2',
                ]}
               />
            </Col>
            <Col md="9">
              <Configure hitsPerPage={12} />
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
