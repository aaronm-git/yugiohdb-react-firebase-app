import React from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";
import { Row, Col } from "react-bootstrap";

import CardDetails from "./CardDetails";
import Loading from "./Loading";
import Image from "./Image";

export default function CardPage(props) {
  let card = props.card;
  const { setCard } = props;
  let { id } = useParams();
  let db = firebase.firestore();
  React.useEffect(() => {
    const getMissingCard = async () => {
      const cardRef = await db.collection("cards").where("id", "==", parseInt(id, 10)).get();
      if (cardRef.size) {
        setCard(cardRef.docs[0].data());
      } else {
        window.location.replace(`/${window.location.pathname.split("/")[1]}/404`);
      }
    };
    getMissingCard();
  }, [db, id, setCard]);
  return (
    <Row>
      <Col>{card.name ? <Image card={card.card_images[0].id} /> : <Loading />}</Col>
      <Col md="8" lg="5">
        {Object.keys(card).length ? <CardDetails card={card} /> : <Loading />}
      </Col>
      <Col md="12" lg="3" className="text-center py-3">
        <h5>Card Stats</h5>
      </Col>
    </Row>
  );
}
