const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_NEW_CARDS":
      return { ...state, all: [...state.all, action.payload] };
    default:
      return state;
  }
};
