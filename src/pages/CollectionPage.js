import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { selectCollections } from "../store/collection/selectors";
import { fetchCollections } from "../store/collection/actions";
import { useParams } from "react-router-dom";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const routeParameters = useParams();
  const ID = parseInt(routeParameters.id);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      {collections.map((collection) => {
        if (collection.id === ID) {
          return (
            <div key={collection.id}>
              <Jumbotron>
                <h1>{collection.name}</h1>{" "}
                <h5>{collection.cards.length} cards</h5>
              </Jumbotron>

              <div style={cardStyle} key={collection.cards.id}>
                <div style={{ width: "15em" }}>
                  <Card key={collection.cards.id} {...collection} />
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CollectionPage;
