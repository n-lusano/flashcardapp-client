const initialState = {
  //collections.all => [];
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_COLLECTIONS":
      return { ...state, all: [...action.payload] };
    default:
      return state;
  }
};
