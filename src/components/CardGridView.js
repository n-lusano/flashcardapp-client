import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Jumbotron, Button } from "react-bootstrap";
import { showMessageWithTimeout } from "../store/appState/actions";
import { deleteCard } from "../store/collection/actions";

const CardGridView = ({ cards }) => {
  const dispatch = useDispatch();
  const [cardId, setCardId] = useState();
  const routeParameters = useParams();
  const ID = parseInt(routeParameters.id);

  const buttonStyle = {
    textTransform: "uppercase",
    fontSize: "0.8em",
  };

  return (
    <div>
      {cards.map((card) => {
        if (card.collectionId === ID) {
          function removeCard() {
            setCardId(card.id);
            dispatch(deleteCard(card.id));

            dispatch(
              showMessageWithTimeout(
                "success",
                true,
                `Card "${card.wordEn}" removed!`,
                1500
              )
            );

            setCardId();
          }
          return (
            <div key={card.id} className="text-info">
              <br />
              <Link
                to={`/editcollection/${card.collectionId}/editcard/${card.id}`}
              >
                <Button className="btn-outline-info" variant="light">
                  <span style={buttonStyle}>Edit</span>
                </Button>
              </Link>{" "}
              <Link to={`/viewcollection/${card.collectionId}`}>
                <Button
                  className="btn-outline-info"
                  variant="light"
                  value={card.id}
                  onClick={removeCard}
                >
                  <span style={buttonStyle}>Delete</span>
                </Button>
              </Link>
              <br />
              <br />
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
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CardGridView;
