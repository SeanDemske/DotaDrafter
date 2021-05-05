class Player {
  constructor(id, lobbyId) {
    this.id = id;
    this.lobbyId = lobbyId;
    this.username = "username";
    this.picks = [];
    this.bans = [];
    this.reserveTime = 150;
  }
  getPlayerId() {
    return this.id;
  }
}

module.exports = { Player };