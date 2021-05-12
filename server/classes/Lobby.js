const { Chat } = require("./Chat");

class Lobby {
  constructor(id) {
    this.id = id;
    this.lobbyFull = false;
    this.teamToPick = null;
    this.switchPickBan = "BAN";
    this.playerRadiant = null;
    this.playerDire = null;
    this.draftInProgress = false;
    this.gameStartCountdown = 10;
    this.draftTime = 30;
    this.chat = new Chat("randId", this.id);
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

  startGameCountdown(callback) {
    console.log("STARTING GAME!!!", this.gameStartCountdown);
    
    let timerId = setInterval(() => {
      if (this.gameStartCountdown < 0) {
        clearTimeout(timerId);
        console.log("TIMES UP, STARTING GAME");
        this.startDraft(callback);
        return 0;
      } else {
        console.log(this.gameStartCountdown);
        callback();
        this.gameStartCountdown = this.gameStartCountdown - 1;
        return this.gameStartCountdown;
      }
    }, 1000);
  }

  startDraft(callback) {
    console.log("STARTING DRAFT!!!");

    this.draftInProgress = true;
    this.teamToPick = "Radiant";
    
    let timerId = setInterval(() => {
      if (this.draftTime < 0) {
        clearTimeout(timerId);
        console.log("TIMES UP");
        return 0;
      } else {
        callback();
        this.draftTime = this.draftTime - 1;
        return this.draftTime;
      }
    }, 1000);
    
  }
}


module.exports = { Lobby };