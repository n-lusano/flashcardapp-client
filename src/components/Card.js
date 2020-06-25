import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Card(props) {
  const { cards } = props;

  return (
    <div>
      {cards.map((card) => {
        return (
          <div key={card.id} className="text-info">
            <div className="Card">
              <Jumbotron key={card.id}>{card.wordEn}</Jumbotron>
            </div>
          </div>
        );
      })}
    </div>
  );
}
