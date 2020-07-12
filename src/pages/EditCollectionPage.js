import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Jumbotron, Col, Form, Container, Button } from "react-bootstrap";

import { showMessageWithTimeout } from "../store/appState/actions";
import { editCollection } from "../store/collection/actions";
import { selectCollections } from "../store/collection/selectors";

const EditCollectionPage = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const routeParameters = useParams();
  const ID = parseInt(routeParameters.id);
  const currentCollection = collections.filter(
    (collection) => collection.id === ID
  )[0];

  function submitForm() {
    dispatch(editCollection(name, ID));
    dispatch(
      showMessageWithTimeout(
        "success",
        true,
        `Collection "${name}" updated!`,
        1500
      )
    );

    setName("");
  }

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
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <Form.Group controlId="formCreateCollection">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder={`${currentCollection.name}`}
              required
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Link to="/user">
              <Button variant="info" type="submit" onClick={submitForm}>
                Submit
              </Button>
            </Link>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default EditCollectionPage;
