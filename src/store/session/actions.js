import axios from "axios";
import { apiUrl } from "../../config/constants";

export const saveSessions = (sessions) => ({
  type: "SAVE_SESSIONS",
  payload: sessions, // => [{}, {}, {}]
});

export const saveActiveSession = (session) => ({
  type: "SAVE_ACTIVE_SESSIONS",
  payload: session,
});

export const saveFinishedSession = (session) => ({
  type: "SAVE_FINISHED_SESSIONS",
  payload: session,
});

export const saveUserCollectionStats = (sessions) => ({
  type: "SAVE_USER_COLLECTION_STATS",
  payload: sessions,
});

export const fetchSessions = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/sessions/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(saveSessions(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const createSession = (collectionId) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;

    let finished = false;

    const response = await axios.post(
      `${apiUrl}/sessions/collections/${collectionId}`,
      {
        finished,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(saveActiveSession(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const finishSession = (collectionId, finished) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().user;

    const response = await axios.patch(
      `${apiUrl}/sessions/collections/${collectionId}`,
      {
        finished: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(saveFinishedSession(response.data));
    dispatch(getUserCollectionSessions(collectionId));
  } catch (error) {
    console.log(error);
  }
};

export const getUserCollectionSessions = (collectionId) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState().user;

    const response = await axios.get(
      `${apiUrl}/sessions/stats/${collectionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(saveUserCollectionStats(response.data));
  } catch (error) {
    console.log(error);
  }
};
