import React from "react";
import { CardDeck, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home({ recentCards, selectThisCard }) {
  const cardItem = (card) => (
    <Card
      key={"recent-" + card.objectID}
      className="mb-2 shadow-sm ml-2"
      style={{minWidth: "200px", maxWidth:"200px"}}
    >
      <div
        style={{
          height: "200px",
          backgroundImage: `url(${card.imageURLs.full}), url('https://storage.cloud.google.com/yugiohdb-app.appspot.com/cards/default.jpg')`,
          backgroundRepeat: "none",
          backgroundSize: "cover",
        }}
      />
      <Card.ImgOverlay
        className="py-1 text-white"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          height: "2rem",
          top: "168px",
        }}
      >
        <div>
          {typeof card.atk === "number" && typeof card.def === "number" ? (
            <p>
              {card.atk}/{card.def}
            </p>
          ) : (
            <p>{card.race}</p>
          )}
        </div>
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Title>
          <Link
            to={`/card/${card.objectID}`}
            onClick={() => selectThisCard(card)}
          >
            {card.name}
          </Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
  return (
    <>
      <h5>Recently Viewed Cards</h5>
      <CardDeck className="row flex-nowrap" style={{ overflow: "scroll" }}>
        {recentCards ? (
          recentCards.map((card) => cardItem(card))
        ) : (
          <Card>
            <Card.Body>
              <Card.Text className="text-center text-muted">
                No Recently Viewed Cards
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </CardDeck>
    </>
  );
}
