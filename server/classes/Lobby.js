const { Chat } = require("./Chat");

class Lobby {
  constructor(id) {
    this.id = id;
    this.lobbyFull = false;
    this.playerRadiant = null;
    this.playerDire = null;
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
      this.startDraft();
      return this;
    }

    // Dire player already in lobby, add radiant player
    if (this.playerDire !== null && this.playerRadiant === null) {
      this.playerRadiant = player;
      player.setTeam("Radiant");
      this.lobbyFull = true;
      this.startDraft();
      return this;
    }
  }

  startDraft() {
    console.log("STARTING DRAFT!!!");
  }
}


module.exports = { Lobby };