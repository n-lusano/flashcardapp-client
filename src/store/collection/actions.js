import axios from "axios";
import { apiUrl } from "../../config/constants";

export const saveCollections = (collections) => ({
  type: "SAVE_COLLECTIONS",
  payload: collections, // => [{}, {}, {}]
});

export const saveNewCollections = (collections) => ({
  type: "SAVE_NEW_COLLECTIONS",
  payload: collections, // => [{}, {}, {}]
});

export const eliminateCollection = (collection) => ({
  type: "ELIMINATE_COLLECTION",
  payload: collection,
});

export const eliminateCard = (card) => ({
  type: "ELIMINATE_CARD",
  payload: card,
});

export const updateCollection = (collection) => ({
  type: "UPDATE_COLLECTION",
  payload: collection,
});

export const updateCard = (card) => ({
  type: "UPDATE_CARD",
  payload: card,
});

export const fetchCollections = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/collections/`);

    dispatch(saveCollections(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const createCollection = (name, userId) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().user;
    const response = await axios.post(
      `${apiUrl}/collections`,
      {
        name,
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(saveNewCollections(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteCollection = (collectionId) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().user;
    const response = await axios.delete(
      `${apiUrl}/collections/${collectionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(eliminateCollection(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = (cardId) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const response = await axios.delete(`${apiUrl}/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(eliminateCard(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const editCollection = (name, collectionId) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().user;
    const response = await axios.patch(
      `${apiUrl}/collections/${collectionId}`,
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(updateCollection(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const editCard = (wordEn, wordNl, cardId) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().user;
    const response = await axios.patch(
      `${apiUrl}/cards/${cardId}`,
      {
        wordEn: wordEn,
        wordNl: wordNl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(updateCard(response.data));
  } catch (error) {
    console.log(error);
  }
};
