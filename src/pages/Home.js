import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { selectCollections } from "../store/collection/selectors";
import { fetchCollections } from "../store/collection/actions";

const Home = () => {
  // NB RICORDA CHE AL POSTO DI HOMEPAGE VA LA LINGUA SELEZIONATA as props

  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  return (
    <div>
      <Jumbotron>
        <h1>Homepage</h1>
      </Jumbotron>

      {collections.map((collection) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={collection.id}
          >
            <div style={{ width: "20%" }}>
              <CollectionCard key={collection.id} {...collection} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
