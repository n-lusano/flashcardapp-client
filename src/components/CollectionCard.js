import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Jumbotron, Tooltip, OverlayTrigger } from "react-bootstrap";
import { showMessageWithTimeout } from "../store/appState/actions";
import { createSession } from "../store/session/actions";
import { selectToken } from "../store/user/selectors";

const CollectionCard = ({ id, name, cards }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const tooltip = (
    <Tooltip id="tooltip">
      <div>{typeof cards === "undefined" ? 0 : cards.length} cards</div>{" "}
    </Tooltip>
  );

  function sendMessage() {
    dispatch(showMessageWithTimeout("danger", false, "Log in to play!", 1500));
  }

  function newSession() {
    dispatch(createSession(id));
  }

  return (
    <div>
      {token ? (
        <Link
          to={`/collections/${id}`}
          className="text-info"
          onClick={newSession}
        >
          <OverlayTrigger
            placement="right"
            delay={{ show: 230, hide: 250 }}
            overlay={tooltip}
          >
            <Jumbotron style={{ textAlign: "center", paddingLeft: "10%" }}>
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
};

export default CollectionCard;
