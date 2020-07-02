import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { selectCollections } from "../store/collection/selectors";
import { fetchCollections } from "../store/collection/actions";
import { selectUser, selectToken } from "../store/user/selectors";
import "../style/Global.css";
import "../style/CollectionCard.scss";
import Button from "react-bootstrap/Button";
import { fetchSessions, createSession } from "../store/session/actions";
import { selectSessions } from "../store/session/selectors";

const UserPage = () => {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const sortedCollections = [...collections].sort((a, b) => {
    return b.id - a.id;
  });
  const user = useSelector(selectUser);
  const sessions = useSelector(selectSessions);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchSessions(token));
  }, [dispatch]);

  const buttonStyle = {
    textTransform: "uppercase",
    fontSize: "0.8em",
  };

  console.log("whatthefuckis SESSIONS", sessions);

  return (
    <div>
      <Jumbotron>
        <h1>Profile page</h1>
      </Jumbotron>
      <div>
        <Button className="btn-info" style={{ marginLeft: "20px" }}>
          <span style={buttonStyle}>New Collection</span>
        </Button>
        <br />
        <br />
      </div>

      <div className="row">
        {sortedCollections.map((collection) => {
          if (user.id === collection.userId) {
            return (
              <div key={collection.id}>
                <div className="col-md-3" key={collection.id}>
                  <p>
                    <Button className="btn-outline-info" variant="light">
                      &#128393;
                    </Button>
                  </p>
                  <div className="collectionCard" style={{ width: "13em" }}>
                    <CollectionCard key={collection.id} {...collection} />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default UserPage;
