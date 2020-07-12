export const selectUserCards = (state) => {
  if (!state.cards.all) {
    return {};
  }

  // console.log("WHAT IS STATE", state);

  const allCards = state.cards.all;
  const userID = state.user.id;

  // console.log("ALL CARDS", allCards);

  const userCards = allCards.filter((card) => {
    if (card.userId === userID) {
      return card;
    }
  });

  return {
    userCards,
  };
};
