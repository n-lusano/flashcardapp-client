import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Card(props) {
  const { cards } = props;

  return (
    <div>
      {cards.map((card) => {
        return (
          <div key={card.id} className="text-info">
            <div className="Card2">
              <div className="row-lg-4 card-container">
                <div className="card-flip">
                  <div className="card front">
                    <Jumbotron key={card.id}>{card.wordEn}</Jumbotron>
                  </div>
                  <div className="card back">
                    <Jumbotron key={card.id}>{card.wordNl}</Jumbotron>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
