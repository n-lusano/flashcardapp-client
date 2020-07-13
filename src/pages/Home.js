import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron } from "react-bootstrap";
import "../style/Global.css";
import "../style/CollectionCard.scss";
import CollectionCard from "../components/CollectionCard";
import { selectCollections } from "../store/collection/selectors";
import { fetchCollections } from "../store/collection/actions";
import { fetchScoredCards } from "../store/scoredcard/actions";
import { fetchSessions } from "../store/session/actions";
import { selectToken } from "../store/user/selectors";

const Home = () => {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const token = useSelector(selectToken);
  const sortedCollections = [...collections].sort((a, b) => {
    return b.id - a.id;
  });

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchSessions(token));
    dispatch(fetchScoredCards(token));
  }, [dispatch]);

  return (
    <div>
      <Jumbotron>
        <h1>Homepage</h1>
      </Jumbotron>

      <div className="row">
        {sortedCollections.map((collection) => {
          return (
            <div key={collection.id}>
              <div className="col-md-3" key={collection.id}>
                <div className="collectionCard" style={{ width: "13em" }}>
                  <CollectionCard key={collection.id} {...collection} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
