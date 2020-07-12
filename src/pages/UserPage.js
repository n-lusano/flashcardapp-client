import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { selectCollections } from "../store/collection/selectors";
import {
  fetchCollections,
  deleteCollection,
} from "../store/collection/actions";
import { selectUser, selectToken } from "../store/user/selectors";
import "../style/Global.css";
import "../style/CollectionCard.scss";
import Button from "react-bootstrap/Button";
import { fetchSessions } from "../store/session/actions";
import { fetchScoredCards } from "../store/scoredcard/actions";
import {
  showMessageWithTimeout,
  appLoading,
  appDoneLoading,
} from "../store/appState/actions";

const UserPage = ({ id }) => {
  const [collectionId, setCollectionId] = useState();
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const sortedCollections = [...collections].sort((a, b) => {
    return b.id - a.id;
  });
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchSessions(token));
    dispatch(fetchScoredCards(token));
  }, [dispatch]);

  const buttonStyle = {
    textTransform: "uppercase",
    fontSize: "0.8em",
  };

  return (
    <div>
      <Jumbotron>
        <h1>Profile page</h1>
      </Jumbotron>
      <div>
        <Link to="/createcollection">
          <Button className="btn-info" style={{ marginLeft: "20px" }}>
            <span style={buttonStyle}>New Collection</span>
          </Button>
        </Link>
        <br />
        <br />
      </div>

      <div className="row">
        {sortedCollections.map((collection) => {
          function removeCollection() {
            setCollectionId(collection.id);
            dispatch(deleteCollection(collection.id));

            dispatch(
              showMessageWithTimeout(
                "success",
                true,
                `Collection "${collection.name}" removed!`,
                1500
              )
            );

            setCollectionId();
          }

          if (user.id === collection.userId) {
            return (
              <div key={collection.id}>
                <div key={collection.id}>
                  <br />
                  <Link to={`/editcollection/${collection.id}`}>
                    <Button className="btn-outline-info" variant="light">
                      <span style={buttonStyle}>Edit</span>
                    </Button>
                  </Link>{" "}
                  <Link to={"/user"}>
                    <Button
                      className="btn-outline-info"
                      variant="light"
                      value={collection.id}
                      onClick={removeCollection}
                    >
                      <span style={buttonStyle}>Delete</span>
                    </Button>
                  </Link>
                  <br />
                  <br />
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

// &#128393;  EDIT
