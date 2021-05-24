const hero_data = require("../hero_data");

class Player {
  constructor(id, lobbyId) {
    this.id = id;
    this.lobbyId = lobbyId;
    this.username = "Dota Player";
    this.team = undefined;
    this.picks = ["unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero"];
    this.bans = ["unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero", "unselected_hero"];
    this.pickCount = 0;
    this.banCount = 0;
    this.reserveTime = 5;
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

  autoPick(updateAutoPicks) {
    let validHero = false;
    let randomHeroId;
    while (!validHero) {
      randomHeroId = (Math.floor(Math.random() * 129) + 1).toString();

      if (this.picks.some((pick) => {
        Array.isArray(pick) ? pick.id === randomHeroId : 1 === 2;
      })) {
        validHero = false;
      } else {
        validHero = true;
      }

    }
    this.pickHero(hero_data.hero_data[randomHeroId]);
    updateAutoPicks(this.team, this.picks);
  }

  autoBan(updateAutoBans) {
    let validHero = false;
    let randomHeroId;
    while (!validHero) {
      randomHeroId = (Math.floor(Math.random() * 129) + 1).toString();

      if (this.bans.some((ban) => {
        Array.isArray(ban) ? ban.id === randomHeroId : 1 === 2;
      })) {
        validHero = false;
      } else {
        validHero = true;
      }

    }
    this.banHero(hero_data.hero_data[randomHeroId]);
    console.log(this.bans);
    updateAutoBans(this.team, this.bans);
  }

  startReserveCountdown(togglePlayer, callback, updateAutoPicks, updateAutoBans) {
    console.log("TAKING RESERVE TIME", this.reserveTime);
    
    let timerId = setInterval(() => {
      if (this.reserveTime <= 0) {
        clearTimeout(timerId);
        console.log("TIMES UP, AUTOPICKING HERO");
        this.autoPick(updateAutoPicks);
        togglePlayer(callback, updateAutoPicks, updateAutoBans);
        return 0;
      } else {
        console.log(this.reserveTime);
        callback();
        this.reserveTime = this.reserveTime - 1;
        return this.reserveTime;
      }
    }, 1000);
  }
}

module.exports = { Player };