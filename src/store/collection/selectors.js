export const selectCollections = (state) => {
  if (!state.collections) {
    return {};
  }
  return state.collections.all;
};

export const selectUserCollections = (state) => {
  if (!state.collections.all) {
    return {};
  }

  const allCollections = state.collections.all;
  const userID = state.user.id;

  const userCollections = allCollections.filter((collection) => {
    if (collection.userId === userID) {
      return collection;
    }
  });

  return {
    name: userCollections.name,
  };
};

export const selectNewestCollectionCreated = (state) => {
  if (!state.collections) {
    return {};
  }

  const allCollections = state.collections.all;
  const userID = state.user.id;

  const userCollections = allCollections.filter((collection) => {
    if (collection.userId === userID) {
      return collection;
    }
  });

  return {
    userCollections,
  };
};
