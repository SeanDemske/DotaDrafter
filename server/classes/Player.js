class Player {
  constructor(id, lobbyId) {
    this.id = id;
    this.lobbyId = lobbyId;
    this.username = "Dota Player";
    this.team = undefined;
    this.picks = [];
    this.bans = [];
    this.reserveTime = 150;
  }

  setTeam(team) {
    this.team = team;
    return this;
  }

  pickHero() {
    console.log("hero picked");
  }

  banHero() {
    console.log("hero banned");
  }
}

module.exports = { Player };