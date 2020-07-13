export const selectUserCards = (state) => {
  if (!state.cards.all) {
    return {};
  }

  const allCards = state.cards.all;
  const userID = state.user.id;

  const userCards = allCards.filter((card) => {
    if (card.userId === userID) {
      return card;
    }
  });

  return {
    userCards,
  };
};
