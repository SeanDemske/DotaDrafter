class Player {
  constructor(id, lobbyId) {
    this.id = id;
    this.lobbyId = lobbyId;
    this.username = "Dota Player";
    this.team = undefined;
    this.picks = ["unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero"];
    this.bans = ["unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero"];
    this.reserveTime = 150;
    this.pickIdx = 0;
    this.banIdx = 0;
  }

  setTeam(team) {
    this.team = team;
    return this;
  }

  pickHero(hero) {
    this.picks[this.pickIdx] = hero;
    this.pickIdx++;
  }

  banHero(hero) {
    this.bans[this.banIdx] = hero;
    this.banIdx++;
  }
}

module.exports = { Player };