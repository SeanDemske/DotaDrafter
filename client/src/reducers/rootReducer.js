import unselectedHero from "../unselectedHero";

const INITIAL_STATE = {
  lobby: null,
  player: null,
  selectedHero: unselectedHero
};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_SELECTED_HERO_STATE":
      return { ...state, selectedHero: { ...action.selectedHero } };

    case "UPDATE_LOBBY_STATE":
      return { ...state, lobby: { ...action.lobbyData } };

    case "UPDATE_PLAYER_STATE":
      return { ...state, player: { ...action.playerData } };

    case "UPDATE_COUNTDOWN":
      return { ...state, lobby: { ...state.lobby, draftTime: action.countdownData.draftTime, gameStartCountdown: action.countdownData.gameStartCountdown, draftInProgress: action.countdownData.draftInProgress } };

    case "UPDATE_PICKS":
      return { 
        ...state, 
        player: { ...state.player, picks: action.picks },
        lobby: { ...state.lobby, [action.teamname]: { ...state.lobby[action.teamname], picks: action.picks} } 
      };

    case "UPDATE_BANS":
      console.log("updating bans", action.teamname);
      return { 
        ...state, 
        player: { ...state.player, bans: action.bans },
        lobby: { ...state.lobby, [action.teamname]: { ...state.lobby[action.teamname], bans: action.bans} } 
      };

    case "RESET_STATE":
      return { ...INITIAL_STATE };



    default:
      return state;
  }
}

export default rootReducer;
