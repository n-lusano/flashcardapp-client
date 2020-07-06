import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { finishSession } from "../store/session/actions";
import { assignScore, assignWrongScore } from "../store/scoredcard/actions";

const Card = ({ cards }) => {
  const dispatch = useDispatch();

  let [index, setIndex] = useState(1);
  const cardCount = cards.length;
  const routeParameters = useParams();
  const ID = parseInt(routeParameters.id);

  const widthProgressBar = (100 / cardCount) * index;

  const firstCard = index === 1;
  const lastCard = index === cardCount;

  return (
    <div>
      {cards.map((card, cardIndex) => {
        function endSession() {
          dispatch(finishSession(card.collectionId));
        }
        function setScore() {
          console.log("card id", card.id);
          dispatch(assignScore(card.collectionId, card.id));
        }

        function setWrongScore() {
          console.log("card id", card.id);
          dispatch(assignWrongScore(card.collectionId, card.id));
        }
        if (
          cardIndex === ((index % cardCount) + cardCount) % cardCount && //see REFERENCES.md
          card.collectionId === ID
        ) {
          return (
            <div key={card.id} className="text-info">
              <div className="Card2">
                <div className="card-container">
                  <div className="card-flip">
                    <div className="card front">
                      <Jumbotron key={card.id}>{card.wordEn}</Jumbotron>
                    </div>
                    <div className="card back">
                      <Jumbotron key={card.id}>{card.wordNl}</Jumbotron>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  {firstCard ? (
                    <Button className="btn-outline-info" variant="light">
                      &#9664;
                    </Button>
                  ) : (
                    <Button
                      className="btn-outline-info"
                      variant="light"
                      onClick={() => {
                        setIndex(--index);
                      }}
                    >
                      &#9664;
                    </Button>
                  )}
                  <Button
                    className="btn-outline-success"
                    variant="light"
                    value={card.id}
                    onClick={setScore}
                  >
                    &#x2714;
                  </Button>{" "}
                  <Button className="btn-outline-info" variant="light">
                    &#128266;
                  </Button>{" "}
                  <Button
                    className="btn-outline-danger"
                    variant="light"
                    onClick={setWrongScore}
                  >
                    &#x2716;
                  </Button>
                  {lastCard ? (
                    <Button
                      className="btn-outline-info"
                      variant="light"
                      onClick={endSession}
                    >
                      <Link to="/" exact>
                        &#x1F51A;
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      className="btn-outline-info"
                      variant="light"
                      onClick={() => {
                        setIndex(++index);
                      }}
                    >
                      &#9654;
                    </Button>
                  )}
                </div>
              </div>
              <br />
              <div className="progress">
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: `${widthProgressBar}%` }}
                  aria-valuemin="0"
                  aria-valuemax={cardCount}
                >
                  {`${index}/${cardCount}`}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;

/*&#9664; or &#11207;*/
/*&#9654; or &#11208;*/
