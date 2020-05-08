import React from "react";
import { CardDeck, Card, Button } from "react-bootstrap";

export default function Home({ recentCards }) {
  const cardItem = (card) => (
    <Card style={{ width: "18rem" }} key={"recent-" + card.id}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        {card.type}
        <hr />
        <Card.Text>{card.desc}</Card.Text>
        <Button variant="primary">View Card</Button>
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
