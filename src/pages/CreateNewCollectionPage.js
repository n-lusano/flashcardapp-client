import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Jumbotron, Col, Form, Container, Button } from "react-bootstrap";

import { showMessageWithTimeout } from "../store/appState/actions";
import { createCollection } from "../store/collection/actions";

const CreateNewCollectionPage = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function submitForm() {
    dispatch(createCollection(name));
    dispatch(
      showMessageWithTimeout(
        "success",
        true,
        `New collection "${name}" created!`,
        1500
      )
    );

    setName("");
  }

  return (
    <div>
      <Jumbotron>
        <h1>New collection</h1>
      </Jumbotron>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <Form.Group controlId="formCreateCollection">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter collection name"
              required
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Link to="/createcard">
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

export default CreateNewCollectionPage;