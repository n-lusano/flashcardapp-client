import axios from "axios";
import { apiUrl } from "../../config/constants";

export const saveNewCards = (cards) => ({
  type: "SAVE_NEW_CARDS",
  payload: cards, // => [{}, {}, {}]
});

export const createCard = (collectionId, wordEn, wordNl) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().user;
    const response = await axios.post(
      `${apiUrl}/cards`,
      {
        wordEn,
        wordNl,
        collectionId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(saveNewCards(response.data));
  } catch (error) {
    console.log(error);
  }
};
