import React from "react";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Image, Button } from "react-bootstrap";
import Loading from "./Loading";

export default function SearchResults({ location, selectThisCard }) {
  const [results, setResults] = React.useState({});
  const history = useHistory();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("q");
  const qb = firebase.firestore();
  React.useEffect(() => {
    const getSearchResults = async () => {
      const querySnapshot = await qb
        .collection("cards")
        .where("name", ">=", searchTerm)
        .orderBy("name")
        .limit(10)
        .get();
      const cache = {};
      if (querySnapshot.size) querySnapshot.forEach((doc) => (cache[doc.id] = doc.data()));
      setResults(cache);
    };
    getSearchResults();
  }, [qb, searchTerm]);
  const setSelectedCard = (selectedCard) => {
    selectThisCard(selectedCard);
    history.push(`/card/${selectedCard.id}`);
  };
  const OutputResults = ({ cards }) => {
    const monsterCards = Object.keys(cards).filter((key) => cards[key].type.includes("Monster"));
    const spellTrapCards = Object.keys(cards).filter((key) => !cards[key].type.includes("Monster"));
    return (
      <>
        <h5>Monster Cards</h5>
        <Table striped bordered hover size="sm" responsive>
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
                  {/* <Image src={cards[key].card_images[0].image_url_small} thumbnail /> */}
                  <Image
                    src="https://cdn11.bigcommerce.com/s-0kvv9/images/stencil/1280x1280/products/228856/317481/dpbcen009__44302.1519956921.jpg?c=2&imbypass=on"
                    thumbnail
                    style={{ maxWidth: "3.5rem" }}
                  />
                </td>
                <td>
                  <Button variant="link" size="sm" onClick={() => setSelectedCard(cards[key])}>
                    {cards[key].name}
                  </Button>
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
        <h5>Spell/Trap Cards</h5>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
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
                  {/* <Image src={cards[key].card_images[0].image_url_small} thumbnail /> */}
                  <Image
                    src="https://usercontent1.hubstatic.com/14211330.png"
                    style={{ maxWidth: "3.5rem" }}
                    thumbnail
                  />
                </td>

                <td>
                  <Button variant="link" size="sm" onClick={() => setSelectedCard(cards[key])}>
                    {cards[key].name}
                  </Button>{" "}
                </td>
                <td>{cards[key].race}</td>
                <td>{cards[key].type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };
  return (
    <Row className="justify-content-md-center">
      <Col className="text-center" id="searchResultContainer">
        <h1 className="text-center">Search</h1>
        {Object.keys(results).length ? <OutputResults cards={results} /> : <Loading />}
      </Col>
    </Row>
  );
}
