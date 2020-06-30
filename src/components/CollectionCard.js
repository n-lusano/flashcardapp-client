import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link } from "react-router-dom";
import { selectToken } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { showMessageWithTimeout } from "../store/appState/actions";

export default function CollectionCard({ id, name, cards }) {
  //const resizedFont = { fontSize: "12px" };
  //<div style={resizedFont}>

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const tooltip = (
    <Tooltip id="tooltip">
      <div>{cards.length} cards</div>
    </Tooltip>
  );

  function sendMessage() {
    dispatch(showMessageWithTimeout("danger", false, "Log in to play!", 1500));
  }

  return (
    <div>
      {token ? (
        <Link to={`/collections/${id}`} className="text-info">
          <OverlayTrigger
            placement="right"
            delay={{ show: 230, hide: 250 }}
            overlay={tooltip}
          >
            <Jumbotron>
              <h3>{name}</h3>
            </Jumbotron>
          </OverlayTrigger>
        </Link>
      ) : (
        <Link to="#" className="text-info" onClick={sendMessage}>
          <Jumbotron>
            <h3>{name}</h3>
          </Jumbotron>
        </Link>
      )}
    </div>
  );
}

// IF TOKEN
// <Button className="btn-outline-info" variant="light">
//   &#128393;
// </Button>
