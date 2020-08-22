import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron, Col, Form, Container, Button } from "react-bootstrap";
import { showMessageWithTimeout } from "../store/appState/actions";
import { editCollection } from "../store/collection/actions";
import { selectCollections } from "../store/collection/selectors";

const EditCollectionPage = () => {
  const dispatch = useDispatch();
  const routeParameters = useParams();
  const collections = useSelector(selectCollections);
  const ID = parseInt(routeParameters.id);
  const currentCollection = collections.filter(
    (collection) => collection.id === ID
  )[0];
  const [name, setName] = useState(currentCollection.name);

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
          <Form.Group controlId="formEditCollection">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              autocomplete="off"
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
