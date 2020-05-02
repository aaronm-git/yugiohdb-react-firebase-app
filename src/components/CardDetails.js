import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
export default function CardDetails({ card }) {
  const getType = (type) => {
    let color = "";
    let textColor = "";
    switch (type) {
      case "Effect Monster":
        color = "orange";
        textColor = "white";
        break;
      case "Trap Card":
        color = "#af3568";
        textColor = "white";
        break;
      case "Spell Card":
        color = "#3edf80";
        textColor = "white";
        break;
      default:
        break;
    }
    return (
      <Badge variant="secondary" style={{ backgroundColor: color, color: textColor }}>
        {type}
      </Badge>
    );
  };
  const GetListGroup = ({ card }) => {
    let cardATK;
    let cardRace;
    if (card.type && card.type.includes("Monster")) {
      cardATK = (
        <ListGroup.Item>
          ATK: {card.atk} / DEF: {card.def}
        </ListGroup.Item>
      );
      cardRace = <Badge variant="secondary">{card.race}</Badge>;
    }
    let cardDescription = card.desc.replace("●", "\n●");
    return (
      <ListGroup variant="flush">
        <ListGroup.Item>
          <div className="d-flex justify-content-between">
            <div>
              {getType(card.type)} / ID: {card.id}
            </div>
            <div>
              <Badge variant="secondary">{card.attribute}</Badge> {cardRace}
            </div>
          </div>
        </ListGroup.Item>
        {cardATK}
        <ListGroup.Item style={{ whiteSpace: "pre-line" }}>{cardDescription}</ListGroup.Item>
        <ListGroup.Item>
          <p>Archetype: {card.archetype}</p>
        </ListGroup.Item>
        {/* <ListGroup.Item>
            <p>TCG Initial Release: {card.archetype}</p>
            <p>OCG Initial Release: {card.archetype}</p>
          </ListGroup.Item> */}
      </ListGroup>
    );
  };
  return (
    <div className="position-relative">
      <h2 className="text-center h4">{card.name}</h2>
      {Object.keys(card).length ? <GetListGroup card={card} /> : <h5>Invalid Id</h5>}
    </div>
  );
}
