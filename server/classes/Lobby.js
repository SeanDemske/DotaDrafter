const { Chat } = require("./Chat");

class Lobby {
  constructor(id) {
    this.id = id;
    this.lobbyFull = false;
    this.playerRadiant = null;
    this.playerDire = null;
    this.draftInProgress = false;
    this.draftTime = 30;
    this.chat = new Chat("randId", this.id);
  }

  addPlayer(player, socketEmit) {
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

  startDraft(callback) {
    console.log("STARTING DRAFT!!!");
    this.draftInProgress = true;
    
    let timerId = setInterval(() => {
      if (this.draftTime < 0) {
        clearTimeout(timerId);
        console.log("TIMES UP");
        return 0;
      } else {
        console.log(this.draftTime);
        callback();
        this.draftTime = this.draftTime - 1;
        return this.draftTime;
      }
    }, 1000);
    
  }
}


module.exports = { Lobby };