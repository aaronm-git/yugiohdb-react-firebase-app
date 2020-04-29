import React from "react";
import "./App.css";
import firebase from "../firebase";
import { Container, Row, Card, Col } from "react-bootstrap";

import CardDetails from "./CardDetails";
import SiteNavBar from "./SiteNavBar";
import SiteFooter from "./SiteFooter";

function App() {
  // const [cards, setCards] = React.useState({});
  const [initCard, setInitCard] = React.useState({});
  React.useEffect(() => {
    const options = { source: "cache" };
    const getMasterHyperionCard = async () => {
      const db = firebase.firestore();
      const cardRef = db.collection("cards").doc("b3a17fe0-890c-11ea-95df-13e5b09d4890");
      const card = (await cardRef.get()).data();
      setInitCard(card);
    };
    getMasterHyperionCard();
  }, []);
  return (
    <>
      <Container className="mb-3" style={{ minHeight: "700px" }}>
        <Row>
          <Col className="py-3">
            <SiteNavBar />
          </Col>
        </Row>
        <Card className="shadow-lg">
          <Card.Body>
            <Row className="justify-content-md-center">
              <Col className="text-center py-3">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/616KVG%2B6InL._AC_.jpg"
                  alt={initCard.name}
                  className=""
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              </Col>
              <Col md="8" lg="5">
                <CardDetails card={initCard} />
              </Col>
              <Col md="12" lg="3" className="text-center py-3">
                Card Stats
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Container fluid className="bg-dark">
        <SiteFooter />
      </Container>
    </>
  );
}

export default App;
