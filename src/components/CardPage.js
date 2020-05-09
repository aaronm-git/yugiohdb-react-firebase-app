import React from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";
import { Row, Col } from "react-bootstrap";

import CardDetails from "./CardDetails";
import Loading from "./Loading";
import CardImage from "./CardImage";

const db = firebase.firestore();
export default function CardPage() {
  const [card, setCard] = React.useState({});
  const [cardReady, setCardReady] = React.useState(false);
  const { id } = useParams();
  React.useEffect(() => {
    const getMissingCard = async () => {
      console.log("Querying...");
      const cardRef = await db.collection("cards").where("id", "==", parseInt(id, 10)).get();
      if (cardRef.size) {
        setCard(cardRef.docs[0].data());
        setCardReady(true);
      } else {
        window.location.replace(`/${window.location.pathname.split("/")[1]}/404`);
      }
    };
    getMissingCard();
  }, [id]);
  return (
    <Row>
      <Col className="text-center mb-2 mb-md-0">
        <CardImage cardId={cardReady ? card.card_images[0].id : ""} />
      </Col>
      <Col md="8" lg="5">
        {cardReady ? <CardDetails card={card} /> : <Loading />}
      </Col>
      <Col md="12" lg="3" className="text-center py-3">
        <h5>Card Stats</h5>
      </Col>
    </Row>
  );
}
