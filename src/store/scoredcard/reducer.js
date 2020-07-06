const initialState = {
  all: [],
  active: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_SCOREDCARDS":
      // console.log("what is payload", action.payload);
      return { ...state, all: action.payload };
    case "SAVE_ACTIVE_SCOREDCARD":
      console.log("what is payload", action.payload);
      return { ...state, active: action.payload };
    default:
      return state;
  }
};
