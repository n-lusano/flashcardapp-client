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
      return {
        all: [
          ...state.all.filter(
            (collection) => collection.id !== action.payload.id
          ),
        ],
      };
    case "ELIMINATE_CARD":
      console.log("what is state.all", state.all);
      return {
        all: [
          ...state.all.map((collection) => {
            if (collection.id === action.payload.collectionId) {
              collection.cards = collection.cards.filter(
                (card) => card.id !== action.payload.id
              );
            }
            return collection;
          }),
        ],
      };
    default:
      return state;
  }
};
