const initialState = {
  all: [],
  active: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_SESSIONS":
      return { ...state, all: action.payload };
    case "SAVE_ACTIVE_SESSIONS":
      // console.log("what is the payload", action.payload);

      return { ...state, active: action.payload };
    default:
      return state;
  }
};
