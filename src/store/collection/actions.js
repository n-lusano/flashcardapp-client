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

export const deleteCollection = (id) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const response = await axios.delete(`${apiUrl}/collections/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(eliminateCollection(response.data));
  } catch (error) {
    console.log(error);
  }
};
