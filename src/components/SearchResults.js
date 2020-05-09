import React from "react";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Image, Button } from "react-bootstrap";
import Loading from "./Loading";

export default function SearchResults({ location, selectThisCard }) {
  const [results, setResults] = React.useState({});
  const [queryFinished, setQueryFinished] = React.useState(false);
  const history = useHistory();
  const qb = firebase.firestore();

  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("q");

  React.useEffect(() => {
    const getSearchResults = async () => {
      console.log("Querying...");
      const querySnapshot = await qb
        .collection("cards")
        .where("name", ">=", searchTerm)
        .orderBy("name")
        .limit(10)
        .get();
      const cache = {};
      if (querySnapshot.size) querySnapshot.forEach((doc) => (cache[doc.id] = doc.data()));
      setResults(cache);
      setQueryFinished(true);
    };
    getSearchResults();
  }, [qb, searchTerm]);

  const Thumbnail = (cardId) => (
    <>
      <Image
        src={`https://storage.cloud.google.com/yugiohdb-app.appspot.com/card_thumbnails/${cardId}.jpg`}
        className="d-none"
        onLoad={(e) => {
          e.target.classList.remove("d-none");
          e.target.nextElementSibling.classList.add("d-none");
        }}
        onError={(e) =>
          (e.target.src = "https://storage.cloud.google.com/yugiohdb-app.appspot.com/card_thumbnails/default.jpg")
        }
        thumbnail
        style={{ width: "4rem" }}
      />
      <Loading />
    </>
  );

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
                <td>{Thumbnail(cards[key].id)}</td>
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
                <td>{Thumbnail(cards[key].id)}</td>
                <td>
                  <Button variant="link" size="sm" onClick={() => setSelectedCard(cards[key])}>
                    {cards[key].name}
                  </Button>
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
        {queryFinished ? (
          Object.keys(results).length ? (
            <OutputResults cards={results} />
          ) : (
            <h5>No Results Found for {query}</h5>
          )
        ) : (
          <Loading />
        )}
      </Col>
    </Row>
  );
}
