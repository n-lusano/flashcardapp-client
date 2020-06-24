import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";

export default function CollectionCard(props) {
  const { id, name, cards } = props;

  return (
    <Jumbotron>
      <Link to={`/collections/${id}`}>
        <h6>{name}</h6>
        <div>{cards.length} cards</div>
      </Link>
    </Jumbotron>
  );
}
