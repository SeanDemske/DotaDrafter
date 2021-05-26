const hero_data = require("../hero_data");
const unselected_hero = require("../unselectedHero");

class Player {
  constructor(id, lobbyId) {
    this.id = id;
    this.lobbyId = lobbyId;
    this.username = "Dota Player";
    this.team = undefined;
    this.picks = [unselected_hero, unselected_hero, unselected_hero, unselected_hero, unselected_hero];
    this.bans = [unselected_hero, unselected_hero, unselected_hero, unselected_hero, unselected_hero, unselected_hero, unselected_hero];
    this.pickCount = 1;
    this.reserveTime = 5;
    this.pickIdx = 0;
    this.banIdx = 0;
  }

  determinePickOrBan(setPickOrBan) {
    switch(this.pickCount) {
      case 1:
        setPickOrBan("BAN");
        return "BAN";
      case 2:
        setPickOrBan("BAN");
        return "BAN";
      case 3:
        setPickOrBan("PICK");
        return "PICK";
      case 4:
        setPickOrBan("PICK");
        return "PICK";
      case 5:
        setPickOrBan("BAN");
        return "BAN";
      case 6:
        setPickOrBan("BAN");
        return "BAN";
      case 7:
        setPickOrBan("BAN");
        return "BAN";
      case 8:
        setPickOrBan("PICK");
        return "PICK";
      case 9:
        setPickOrBan("PICK");
        return "PICK";
      case 10:
        setPickOrBan("BAN");
        return "BAN";
      case 11:
        setPickOrBan("BAN");
        return "BAN";
      case 12:
        setPickOrBan("PICK");
        return "PICK";
      
      default:
        return false;
    } 
  }

  setTeam(team) {
    this.team = team;
    return this;
  }

  pickHero(hero) {
    this.picks[this.pickIdx] = hero;
    this.pickIdx++;
    this.pickCount++;
  }

  banHero(hero) {
    this.bans[this.banIdx] = hero;
    this.banIdx++;
    this.pickCount++;
  }

  autoPick(updateAutoPicks) {
    let validHero = false;
    let randomHero;
    while (!validHero) {
        var keys = Object.keys(hero_data);
        randomHero = hero_data[keys[ keys.length * Math.random() << 0]];

        if (this.picks.some((pick) => {
          pick.id === randomHero.id;
        })) {
          validHero = false;
        } else {
          validHero = true;
        };
    };

    
    console.log(randomHero);
    this.pickHero(randomHero);
    updateAutoPicks(this.team, this.picks);
  }

  autoBan(updateAutoBans) {
    let validHero = false;
    let randomHero;
    while (!validHero) {
      var keys = Object.keys(hero_data);
      randomHero = hero_data[keys[ keys.length * Math.random() << 0]];

      if (this.picks.some((pick) => {
        pick.id === randomHero.id;
      })) {
        validHero = false;
      } else {
        validHero = true;
      };
    }


    console.log(randomHero);
    this.banHero(randomHero);
    updateAutoBans(this.team, this.bans);
  }

  startReserveCountdown(togglePlayer, callback, updateAutoPicks, updateAutoBans, pickOrBan, setPickOrBan) {
    console.log("TAKING RESERVE TIME", this.reserveTime);
    
    let timerId = setInterval(() => {
      if (this.reserveTime <= 0) {
        clearTimeout(timerId);
        console.log("TIMES UP, AUTOPICKING HERO");

        switch(this.determinePickOrBan(setPickOrBan)) {
          case "PICK":
            this.autoPick(updateAutoPicks);
            break;
          case "BAN":
            this.autoBan(updateAutoBans);
            break;
          default:
            break;
        } 
        
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