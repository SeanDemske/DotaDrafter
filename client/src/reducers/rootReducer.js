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
      return { 
        ...state, 
        lobby: 
        { 
          ...state.lobby,
          draftCompleted: action.countdownData.draftCompleted, 
          draftTime: action.countdownData.draftTime, 
          gameStartCountdown: action.countdownData.gameStartCountdown, 
          draftInProgress: action.countdownData.draftInProgress,
          teamToPick: action.countdownData.teamToPick, 
          playerRadiant: {
            ...state.lobby.playerRadiant,
            reserveTime: action.countdownData.radiantReserve
          },
          playerDire: {
            ...state.lobby.playerDire,
            reserveTime: action.countdownData.direReserve
          }

        } };

    case "UPDATE_PICKS":
      return { 
        ...state, 
        lobby: { ...state.lobby, [action.teamname]: { ...state.lobby[action.teamname], picks: action.picks} } 
      };

    case "UPDATE_BANS":
      return { 
        ...state, 
        lobby: { ...state.lobby, [action.teamname]: { ...state.lobby[action.teamname], bans: action.bans} } 
      };

    case "UPDATE_PICK_BAN_STATE":
      return { 
        ...state, 
        lobby: { ...state.lobby, switchPickBan: action.pickBanMode, teamToPick: action.pickingTeam } 
      };

    case "UPDATE_CHATBOX":
      console.log("UPDATING CHAT");
      return { 
        ...state, 
        lobby: { ...state.lobby, chat: {...state.lobby.chat, messages: action.messages} } 
      };

    case "RESET_STATE":
      return { ...INITIAL_STATE };



    default:
      return state;
  }
}

export default rootReducer;
