import axios from "axios";
import { apiUrl } from "../../config/constants";

export const saveScoredCards = (scoredCards) => ({
  type: "SAVE_SCOREDCARDS",
  payload: scoredCards, // => [{}, {}, {}]
});

export const saveActiveScoredCard = (scoredCard) => ({
  type: "SAVE_ACTIVE_SCOREDCARD",
  payload: scoredCard,
});

// export const saveFinishedSession = (session) => ({
//   type: "SAVE_FINISHED_SESSIONS",
//   payload: session,
// });

export const fetchScoredCards = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/scoredcards/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(saveScoredCards(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const assignScore = (collectionId, cardId) => async (
  dispatch,
  getState
) => {
  try {
    // console.log("what is card id", cardId);
    const { token } = getState().user;

    let scoredCorrect = true;

    const response = await axios.patch(
      `${apiUrl}/scoredcards/collections/${collectionId}/${cardId}`,
      {
        scoredCorrect,
        cardId: cardId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(saveScoredCards(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const assignWrongScore = (collectionId, cardId) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().user;

    let scoredCorrect = false;

    const response = await axios.patch(
      `${apiUrl}/scoredcards/collections/${collectionId}/${cardId}`,
      {
        scoredCorrect,
        cardId: cardId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(saveActiveScoredCard(response.data));
  } catch (error) {
    console.log(error);
  }
};
