import React from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";
import { Row, Col } from "react-bootstrap";

import CardDetails from "./CardDetails";
import Loading from "./Loading";
import CardImage from "./CardImage";

export default function CardPage({ card, selectThisCard }) {
  const [showCard, setShowCard] = React.useState(JSON.parse(localStorage.getItem("selectedCard")) || card);
  const cardExists = Object.keys(showCard).length ? true : false;
  console.log(cardExists, showCard);

  const { id } = useParams();

  React.useEffect(() => {
    if (!cardExists) {
      const db = firebase.firestore();
      const getMissingCard = async () => {
        console.log("Gettign for missing card...");
        const cardRef = await db.collection("cards").where("id", "==", parseInt(id, 10)).get();
        if (cardRef.size) {
          selectThisCard(cardRef.docs[0].data());
        } else {
          window.location.replace(`/${window.location.pathname.split("/")[1]}/404`);
        }
      };
      getMissingCard();
    }
  }, [cardExists, id, selectThisCard]);

  return (
    <Row>
      <Col className="text-center mb-2 mb-md-0">
        <CardImage cardId={Object.keys(card).length ? card.card_images[0].id : ""} />
      </Col>
      <Col md="8" lg="5">
        {Object.keys(card).length ? <CardDetails card={card} /> : <Loading />}
      </Col>
      <Col md="12" lg="3" className="text-center py-3">
        <h5>Card Stats</h5>
      </Col>
    </Row>
  );
}
