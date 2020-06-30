import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { selectCollections } from "../store/collection/selectors";
import { fetchCollections } from "../store/collection/actions";
import { selectUser } from "../store/user/selectors";
import "../style/Global.css";
import "../style/CollectionCard.scss";

const UserPage = () => {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const sortedCollections = [...collections].sort((a, b) => {
    return b.id - a.id;
  });
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  return (
    <div>
      <Jumbotron>
        <h1>Profile page</h1>
      </Jumbotron>

      <div className="row">
        {sortedCollections.map((collection) => {
          if (user.id === collection.userId) {
            return (
              <div className="col-md-3" key={collection.id}>
                <div className="collectionCard" style={{ width: "13em" }}>
                  <CollectionCard key={collection.id} {...collection} />
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
