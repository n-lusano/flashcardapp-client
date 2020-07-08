const initialState = {
  all: [],
  active: undefined,
  sessionCards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_SCOREDCARDS":
      return { ...state, all: action.payload };
    case "SAVE_ACTIVE_SCOREDCARD":
      return {
        ...state,
        active: action.payload,
        all: [...state.all, action.payload],
      };
    case "ADD_SESSION_SCOREDCARD":
      return { ...state, scoredCards: [...state.scoredCards, action.payload] };
    default:
      return state;
  }
};
