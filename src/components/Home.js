import React from "react";
import { CardDeck, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home({ recentCards, selectThisCard }) {
  const cardItem = (card) => (
    <Card key={"recent-" + card.id}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        {card.type}
        <hr />
        {/* <Card.Text style={{ maxHeight: "100px", overflow: "scroll" }}>{card.desc}</Card.Text> */}
        <Link to={`/card/${card.id}`} className="btn btn-block btn-warning" onClick={() => selectThisCard(card)}>
          View Card
        </Link>
      </Card.Body>
    </Card>
  );
  return (
    <>
      <h1>Home</h1>
      <hr />
      <h5>Recently Viewed Cards</h5>
      <CardDeck>
        {recentCards ? (
          recentCards.map((card) => cardItem(card))
        ) : (
          <Card>
            <Card.Body>
              <Card.Text className="text-center text-muted">No Recently Viewed Cards</Card.Text>
            </Card.Body>
          </Card>
        )}
      </CardDeck>
    </>
  );
}
