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
      // console.log("what is state", state);
      return {
        all: [
          ...state.all.filter(
            (collection) => collection.id !== action.payload.id
          ),
        ],
      };
    default:
      return state;
  }
};
