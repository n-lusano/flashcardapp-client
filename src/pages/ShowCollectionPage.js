import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron, Button } from "react-bootstrap";
import "../style/Global.css";
import "../style/CollectionCard.scss";
import CardGridView from "../components/CardGridView";
import { fetchCollections } from "../store/collection/actions";
import { selectCollections } from "../store/collection/selectors";
import { fetchSessions } from "../store/session/actions";
import { selectToken } from "../store/user/selectors";

const ShowCollectionPage = () => {
  const dispatch = useDispatch();
  const routeParameters = useParams();
  const token = useSelector(selectToken);
  const collections = useSelector(selectCollections);
  const ID = parseInt(routeParameters.id);
  const currentCollection = collections.filter(
    (collection) => collection.id === ID
  )[0];

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchSessions(token));
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
        <Jumbotron></Jumbotron>
      </div>
    );
  }

  return (
    <div>
      <Jumbotron>
        <h1>"{currentCollection.name}"</h1>
        <h5>
          Total of {currentCollection.cards.length} cards in this collection
        </h5>
      </Jumbotron>
      <div>
        <Link to={`/editcollection/${currentCollection.id}`}>
          <Button className="btn-info" style={{ marginLeft: "20px" }}>
            <span style={buttonStyle}>Edit Collection</span>
          </Button>
        </Link>
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
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCollectionPage;
