const INITIAL_STATE = {
  lobby: null,
  player: null
};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_LOBBY_STATE":
      return { ...state, lobby: { ...action.lobbyData } };

    case "UPDATE_PLAYER_STATE":
      return { ...state, player: { ...action.playerData } };

    case "UPDATE_MAIN_COUNTDOWN":
      console.log(action.timeLeft);
      return { ...state, lobby: { ...state.lobby, draftTime: action.timeLeft } };

    case "RESET_STATE":
      return { ...INITIAL_STATE };



    default:
      return state;
  }
}

export default rootReducer;
