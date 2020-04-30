import React from "react";
import "./App.css";
import firebase from "../firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Container, Row, Col, Card } from "react-bootstrap";

import SearchResult from "./SearchResult";
import SiteNavBar from "./SiteNavBar";
import SiteFooter from "./SiteFooter";

function App() {
  // const [cards, setCards] = React.useState({});
  const [card, setCard] = React.useState({});

  // React.useEffect(() => {
  //   const options = { source: "cache" };
  //   const getMasterHyperionCard = async () => {
  //     const db = firebase.firestore();
  //     const cardRef = db.collection("cards").doc("b3a17fe0-890c-11ea-95df-13e5b09d4890");
  //     const cardResult = (await cardRef.get()).data();
  //     setCard(cardResult);
  //   };
  //   getMasterHyperionCard();
  // }, []);
  return (
    <Router>
      <Container className="mb-3" style={{ minHeight: "calc(100vh - 83px)" }}>
        <Row>
          <Col className="py-3">
            <SiteNavBar />
          </Col>
        </Row>
        <Card className="shadow-lg">
          <Card.Body>
            <Switch>
              <Route path="/card">
                <h1>Card</h1>
                {/* <SearchResult card={card} /> */}
              </Route>
              <Route path="/">
                <h1>Home</h1>
              </Route>
            </Switch>
          </Card.Body>
        </Card>
      </Container>
      <Container fluid className="bg-dark">
        <SiteFooter />
      </Container>
    </Router>
  );
}

export default App;
