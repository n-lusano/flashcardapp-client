export const selectSessions = (state) => state.sessions.all;
export const selectSessionScoredCards = (state) => {
  // console.log("what is state", state);
  if (!state.scoredcards) {
    return {};
  }

  if (!state.sessions.active) {
    return {};
  }

  const scoredcards = state.scoredcards.all;
  const activeSessionID = state.sessions.active.id;

  const scoredCorrect = scoredcards.filter((card) => {
    if (card.sessionId === activeSessionID && card.scoredCorrect === true) {
      return card;
    }
  });
  const scoredIncorrect = scoredcards.filter((card) => {
    if (card.sessionId === activeSessionID && card.scoredCorrect === false) {
      return card;
    }
  });

  return {
    scoredCorrect: scoredCorrect.length,
    scoredIncorrect: scoredIncorrect.length,
  };
};

//SIDENOTE: the selectSessionScoredCards selector works but needs some more logic: a user can technically go back
//and score the same cards how many times they wish,
//and it messes up the active session card count

export const selectActiveSession = (state) => state.sessions.active;

// WORKED BUT VVV
// export const selectSessions = (state) => state.sessions.all;
// export const selectSessionScoredCards = (state) => {
//   console.log("this is state", state.scoredcards.all);
//   console.log("this is the active session", state.sessions.active);

//   if (!state.scoredcards) {
//     return {};
//   }
//   const scoredcards = state.scoredcards.all;
//   const scoredCorrect = scoredcards.filter((card) => {
//     return card.scoredCorrect;
//   });
//   const scoredIncorrect = scoredcards.length - scoredCorrect.length;

//   return {
//     scoredCorrect: scoredCorrect.length,
//     scoredIncorrect,
//   };
// };

// export const selectActiveSession = (state) => state.sessions.active;
