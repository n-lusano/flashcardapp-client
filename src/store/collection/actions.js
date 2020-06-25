import axios from "axios";
import { apiUrl } from "../../config/constants";

export const saveCollections = (collections) => ({
  type: "SAVE_COLLECTIONS",
  payload: collections, // => [{}, {}, {}]
});

export const fetchCollections = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/collections/`);

    dispatch(saveCollections(response.data));
  } catch (error) {
    console.log(error);
  }
};
