import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link } from "react-router-dom";

export default function CollectionCard(props) {
  const { id, name, cards } = props;

  //const resizedFont = { fontSize: "12px" };
  //<div style={resizedFont}>

  const tooltip = (
    <Tooltip id="tooltip">
      <div>{cards.length} cards</div>
    </Tooltip>
  );

  return (
    <Link to={`/collections/${id}`} className="text-info">
      <OverlayTrigger placement="right" overlay={tooltip}>
        <Jumbotron>
          <h3>{name}</h3>
          {/* <div style={resizedFont}>{cards.length} cards</div> */}
        </Jumbotron>
      </OverlayTrigger>
    </Link>
  );
}
