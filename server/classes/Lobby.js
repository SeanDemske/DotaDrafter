const { Chat } = require("./Chat");

class Lobby {
  constructor(id) {
    this.id = id;
    this.lobbyFull = false;
    this.teamToPick = null;
    this.switchPickBan = "PICK";
    this.playerRadiant = null;
    this.playerDire = null;
    this.activePlayer = null;
    this.inactivePlayer = null;
    this.draftInProgress = false;
    this.gameStartCountdown = 10;
    this.draftTime = 5;
    this.chat = new Chat("randId", this.id);
    this.toggleActivePlayer = this.toggleActivePlayer.bind(this);
  }

  addPlayer(player) {
    // Full Lobby
    if (this.playerRadiant !== null && this.playerDire !== null) {
      return false;
    }

    // No players, add radiant
    if (this.playerDire === null && this.playerRadiant === null) {
      this.playerRadiant = player;
      player.setTeam("Radiant");
      return this;
    }

    // Radiant player already in lobby, add dire player
    if (this.playerRadiant !== null && this.playerDire === null) {
      this.playerDire = player;
      player.setTeam("Dire");
      this.lobbyFull = true;
      return this;
    }

    // Dire player already in lobby, add radiant player
    if (this.playerDire !== null && this.playerRadiant === null) {
      this.playerRadiant = player;
      player.setTeam("Radiant");
      this.lobbyFull = true;
      return this;
    }
  }

  startGameCountdown(callback, updateAutoPicks, updateAutoBans) {
    console.log("STARTING GAME!!!", this.gameStartCountdown);
    
    let timerId = setInterval(() => {
      if (this.gameStartCountdown < 0) {
        clearTimeout(timerId);
        console.log("TIMES UP, STARTING GAME");
        this.startDraftConfig(callback, updateAutoPicks, updateAutoBans);
        return 0;
      } else {
        console.log(this.gameStartCountdown);
        callback();
        this.gameStartCountdown = this.gameStartCountdown - 1;
        return this.gameStartCountdown;
      }
    }, 1000);
  }

  startDraftConfig(callback, updateAutoPicks, updateAutoBans) {
    console.log("STARTING DRAFT!!!");

    this.teamToPick = "Radiant";
    this.activePlayer = this.playerRadiant;
    this.inactivePlayer = this.playerDire;
    this.draftInProgress = true;

    this.startDraftCountdown(callback, updateAutoPicks, updateAutoBans);
  }

  startDraftCountdown(callback, updateAutoPicks, updateAutoBans) {
    let timerId = setInterval(() => {
      if (this.draftTime <= 0) {
        clearTimeout(timerId);
        console.log("TIMES UP");
        if (this.activePlayer !== null) {
          this.activePlayer.startReserveCountdown(this.toggleActivePlayer, callback, updateAutoPicks, updateAutoBans);
        }
        return 0;
      } else {
        callback();
        this.draftTime = this.draftTime - 1;
        return this.draftTime;
      }
    }, 1000);
  }

  togglePickingTeam() {
    if (this.teamToPick === null) return false;
    if (this.teamToPick === "Radiant") {
      this.teamToPick = "Dire";
    } else if (this.teamToPick === "Dire") {
      this.teamToPick = "Radiant";
    }
  }

  toggleActivePlayer(callback, updateAutoPicks, updateAutoBans) {
    if (this.activePlayer === null || this.inactivePlayer === null) return false;
    let temp = this.activePlayer;
    this.activePlayer = this.inactivePlayer;
    this.inactivePlayer = temp;
    console.log("SWITCHING SIDES")

    this.draftTime = 5;
    this.startDraftCountdown(callback, updateAutoPicks, updateAutoBans);
  }

  togglePickBanMode() {

  }
}


module.exports = { Lobby };