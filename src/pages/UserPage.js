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

  const user = useSelector(selectUser);

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
      <Jumbotron>
        <h1>Profile page</h1>
      </Jumbotron>

      {collections.map((collection) => {
        if (user.id === collection.userId) {
          return (
            <div style={cardStyle} key={collection.id}>
              <div className="collectionCard" style={{ width: "20%" }}>
                <CollectionCard key={collection.id} {...collection} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default UserPage;
