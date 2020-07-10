import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const CardGridView = ({ cards }) => {
  const dispatch = useDispatch();

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
          return (
            <div key={card.id} className="text-info">
              <br />
              {/* <span style={buttonStyle}>{card.wordEn}</span>{" "} */}
              <Link to={`/editcard/${card.id}`}>
                <Button className="btn-outline-info" variant="light">
                  <span style={buttonStyle}>Edit</span>
                </Button>
              </Link>{" "}
              <Link to={`/editcollection/${card.collectionId}`}>
                <Button className="btn-outline-info" variant="light">
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
