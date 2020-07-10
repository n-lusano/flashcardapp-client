const initialState = {
  //collections.all => [];
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_COLLECTIONS":
      return { ...state, all: action.payload };
    case "SAVE_NEW_COLLECTIONS":
      return { ...state, all: [...state.all, action.payload] };
    case "ELIMINATE_COLLECTION":
      return state.filter((id) => id !== action.payload.id);
    default:
      return state;
  }
};
