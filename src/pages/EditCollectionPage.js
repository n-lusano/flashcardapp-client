import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardGridView from "../components/CardGridView";
import { selectCollections } from "../store/collection/selectors";
import { fetchCollections } from "../store/collection/actions";
import { selectUser, selectToken } from "../store/user/selectors";
import "../style/Global.css";
import "../style/CollectionCard.scss";
import Button from "react-bootstrap/Button";
import { fetchSessions } from "../store/session/actions";
import { fetchScoredCards } from "../store/scoredcard/actions";
import { selectSessionScoredCards } from "../store/session/selectors";
import { useParams } from "react-router-dom";

const EditCollectionPage = () => {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const routeParameters = useParams();
  const ID = parseInt(routeParameters.id);
  const currentCollection = collections.filter(
    (collection) => collection.id === ID
  )[0];

  // const sortedCollections = [...collections].sort((a, b) => {
  //   return b.id - a.id;
  // });
  // const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchSessions(token));
    // dispatch(fetchScoredCards(token));
  }, [dispatch]);

  const buttonStyle = {
    textTransform: "uppercase",
    fontSize: "0.8em",
  };

  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  if (!currentCollection) {
    return (
      <div>
        <Jumbotron>
          <h1>Edit collection</h1>
        </Jumbotron>
      </div>
    );
  }

  return (
    <div>
      <Jumbotron>
        <h1>Edit collection "{currentCollection.name}"</h1>
      </Jumbotron>
      <div>
        <Link to={`/collections/${currentCollection.id}/createcard`}>
          <Button className="btn-info" style={{ marginLeft: "20px" }}>
            <span style={buttonStyle}>New Card</span>
          </Button>
        </Link>
        <br />
        <br />
      </div>

      <div className="row">
        <div className="col-md-3" key={currentCollection.id}>
          <div style={cardStyle} key={currentCollection.cards.id}>
            <div style={{ width: "15em" }}>
              <CardGridView
                key={currentCollection.cards.id}
                {...currentCollection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCollectionPage;
