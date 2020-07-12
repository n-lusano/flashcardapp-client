import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Jumbotron, Col, Form, Container, Button } from "react-bootstrap";

import { showMessageWithTimeout } from "../store/appState/actions";
import { editCard } from "../store/collection/actions";
import { selectCollections } from "../store/collection/selectors";

const EditCardPage = () => {
  const [wordEn, setWordEn] = useState("");
  const [wordNl, setWordNl] = useState("");
  const [CardId, setCardId] = useState();
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const routeParameters = useParams();
  const cardId = parseInt(routeParameters.cardId);
  const collectionId = parseInt(routeParameters.collectionId);
  const currentCollection = collections.filter(
    (collection) => collection.id === collectionId
  )[0];
  const currentCard = currentCollection.cards.filter(
    (card) => card.id === cardId
  )[0];

  function submitForm() {
    setCardId(cardId);
    dispatch(editCard(wordEn, wordNl, cardId));
    dispatch(
      showMessageWithTimeout("success", true, `Card "${wordEn}" updated!`, 1500)
    );

    setWordEn("");
    setWordNl("");
    setCardId();
  }

  if (!currentCollection) {
    return <Jumbotron></Jumbotron>;
  }

  return (
    <div>
      <Jumbotron>
        <h1>Edit card</h1>
        <h5>in: {currentCollection.name}</h5>
      </Jumbotron>
      <Container>
        <Link to={`/viewcollection/${currentCollection.id}`}>
          <Button variant="info" type="submit">
            Back to collection
          </Button>
        </Link>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <Form.Group controlId="formEditCardEN">
            <Form.Label>English</Form.Label>
            <Form.Control
              value={wordEn}
              onChange={(event) => setWordEn(event.target.value)}
              type="text"
              placeholder={currentCard.wordEn}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEditCardNL">
            <Form.Label>Dutch translation</Form.Label>
            <Form.Control
              value={wordNl}
              onChange={(event) => setWordNl(event.target.value)}
              type="text"
              placeholder={currentCard.wordNl}
              required
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Link to={`/viewcollection/${currentCollection.id}`}>
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

export default EditCardPage;
