import React from "react";
import firebase from "../firebase";
import { Link } from "react-router-dom";
import { Row, Col, Table, Spinner, Image } from "react-bootstrap";

export default function SearchResults({ location }) {
  const [results, setResults] = React.useState({});
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("q");
  const qb = firebase.firestore();
  React.useEffect(() => {
    const getSearchResults = async () => {
      const searchResultRef = await qb.collection("cards").where("name", ">=", searchTerm).limit(10).get();
      const cache = {};
      searchResultRef.forEach((result) => (cache[result.id] = result.data()));
      setResults(cache);
    };
    getSearchResults();
  }, [qb, searchTerm]);

  const OutputResults = ({ cards }) => {
    let renderThis;
    const monsterCards = Object.keys(cards).filter((key) => cards[key].type.includes("Monster"));
    const spellTrapCards = Object.keys(cards).filter((key) => !cards[key].type.includes("Monster"));
    if (Object.keys(cards).length) {
      renderThis = (
        <>
          <h1>Monster Cards</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>ATK</th>
                <th>DEF</th>
                <th>LVL</th>
                <th>Race</th>
                <th>Attribute</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {monsterCards.map((key, i) => (
                <tr key={key}>
                  <td>{i + 1}</td>
                  <td>
                    <Image src={cards[key].card_images[0].image_url_small} thumbnail />
                  </td>
                  <td>
                    <Link to={`/card/${key}`}>{cards[key].name}</Link>
                  </td>
                  <td>{cards[key].atk}</td>
                  <td>{cards[key].def}</td>
                  <td>{cards[key].level}</td>
                  <td>{cards[key].race}</td>
                  <td>{cards[key].attribute}</td>
                  <td>{cards[key].type}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h1>Spell/Trap Cards</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Race</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {spellTrapCards.map((key, i) => (
                <tr key={key}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/card/${key}`}>{cards[key].name}</Link>
                  </td>
                  <td>{cards[key].race}</td>
                  <td>{cards[key].type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
    } else {
      renderThis = (
        <Spinner
          animation="border"
          role="status"
          variant="warning"
          className="position-relative"
          style={{ top: "50%", left: "50%" }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    return renderThis;
  };
  return (
    <Row className="justify-content-md-center">
      <Col className="text-center py-3" id="searchResultContainer">
        <OutputResults cards={results} />
      </Col>
    </Row>
  );
}
