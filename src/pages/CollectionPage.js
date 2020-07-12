import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { selectCollections } from "../store/collection/selectors";
import { fetchCollections } from "../store/collection/actions";
import { selectToken } from "../store/user/selectors";
import { fetchSessions } from "../store/session/actions";
import { selectSessionScoredCards } from "../store/session/selectors";
import { useParams } from "react-router-dom";
import { fetchScoredCards } from "../store/scoredcard/actions";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);
  const routeParameters = useParams();
  const ID = parseInt(routeParameters.id);
  const token = useSelector(selectToken);
  const scorecards = useSelector(selectSessionScoredCards);

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchSessions(token));
    dispatch(fetchScoredCards(token));
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
                <h1>{collection.name}</h1>
                <h5>
                  Total of {collection.cards.length} cards in this collection
                </h5>
                <h5>&#x2714; {scorecards.scoredCorrect}</h5>
                <h5>&#x2716; {scorecards.scoredIncorrect}</h5>
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

//CORRECT &#x2714;
//WRONG  &#x2716;

//I still don't like waiting for the {scorecards.scoredCorrect}/{scorecards.scoredIncorrect} to load
//but any change makes it impossible for the first score to be scoredIncorrect AND re-render (???)

//EXAMPLES VVV

// {scorecards.scoredCorrect ? (
//   <div>
//     <h5>
//       &#x2714; {scorecards.scoredCorrect}, &#x2716;{" "}
//       {scorecards.scoredIncorrect}
//     </h5>
//   </div>
// ) : (
//   <div>
//     <h5>Start playing to see your score!</h5>
//   </div>
// )}

//ONLY RE-RENDERS IF scoredCorrect (???)

//I needed an ternary if/else operator (?) or something similar
//so
//a ? b : (c ? d : e)

// {scorecards.scoredCorrect ? (
//   <div>
//     <h5>
//       &#x2714; {scorecards.scoredCorrect}, &#x2716;{" "}
//       {scorecards.scoredIncorrect}
//     </h5>
//   </div>
// ) : !scorecards.scoredCorrect ? (
//   <h5>
//     &#x2714; {scorecards.scoredCorrect}, &#x2716;{" "}
//     {scorecards.scoredIncorrect}
//   </h5>
// ) : (
//   <div>
//     <h5>Start playing to see your score!</h5>
//   </div>
// )}

//THIS WORKED. BUT: TOO VERBOSE/UNMAINTAINABLE/MESSY
