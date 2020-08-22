import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron, Col, Form, Container, Button } from "react-bootstrap";
import { showMessageWithTimeout } from "../store/appState/actions";
import { createCard } from "../store/card/actions";
import { fetchCollections } from "../store/collection/actions";
import { selectCollections } from "../store/collection/selectors";

const CreateNewCardExistingCollectionPage = () => {
  const dispatch = useDispatch();
  const [wordEn, setWordEn] = useState("");
  const [wordNl, setWordNl] = useState("");
  const [collectionId, setCollectionId] = useState();
  const routeParameters = useParams();
  const collections = useSelector(selectCollections);
  const ID = parseInt(routeParameters.id);
  const currentCollection = collections.filter(
    (collection) => collection.id === ID
  )[0];

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  function submitForm() {
    setCollectionId(currentCollection.id);
    dispatch(createCard(currentCollection.id, wordEn, wordNl));
    dispatch(
      showMessageWithTimeout(
        "success",
        true,
        `New card "${wordEn}" created!`,
        1500
      )
    );

    setWordEn("");
    setWordNl("");
    setCollectionId();
  }

  if (!currentCollection) {
    return <Jumbotron></Jumbotron>;
  }

  return (
    <div>
      <Jumbotron>
        <h1>New card</h1>
        <h5>in: {currentCollection.name}</h5>
      </Jumbotron>
      <Container>
        <Link to={`/viewcollection/${currentCollection.id}`}>
          <Button variant="info" type="submit">
            Back to collection
          </Button>
        </Link>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <Form.Group controlId="formCreateCardEN">
            <Form.Label>English</Form.Label>
            <Form.Control
              value={wordEn}
              onChange={(event) => setWordEn(event.target.value)}
              type="text"
              autoComplete="off"
              placeholder="Enter an English word"
              required
            />
          </Form.Group>
          <Form.Group controlId="formCreateCardNL">
            <Form.Label>Dutch translation</Form.Label>
            <Form.Control
              value={wordNl}
              onChange={(event) => setWordNl(event.target.value)}
              type="text"
              autoComplete="off"
              placeholder="Enter the Dutch translation"
              required
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Link to={`/collections/${currentCollection.id}/createcard`}>
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

export default CreateNewCardExistingCollectionPage;
