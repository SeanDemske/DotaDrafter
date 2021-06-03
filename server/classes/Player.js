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
    this.reserveTime = 130;
    this.pickIdx = 0;
    this.banIdx = 0;
    this.timerId = null;
    this.draftComplete = false;
    this.hasLeft = false;
  }

  determinePickOrBan(setPickOrBan = null) {
    switch(this.pickCount) {
      case 1:
        if (setPickOrBan !== null) {
          setPickOrBan("BAN");
        }
        return "BAN";
      case 2:
        if (setPickOrBan !== null) {
          setPickOrBan("BAN");
          console.log("SET TO BAN");
        }
        return "BAN";
      case 3:
        if (setPickOrBan !== null) {
          setPickOrBan("PICK");
          console.log("SET TO PICK");
        }
        return "PICK";
      case 4:
        if (setPickOrBan !== null) {
          setPickOrBan("PICK");
        }
        return "PICK";
      case 5:
        if (setPickOrBan !== null) {
          setPickOrBan("BAN");
        }
        return "BAN";
      case 6:
        if (setPickOrBan !== null) {
          setPickOrBan("BAN");
        }
        return "BAN";
      case 7:
        if (setPickOrBan !== null) {
          setPickOrBan("BAN");
        }
        return "BAN";
      case 8:
        if (setPickOrBan !== null) {
          setPickOrBan("PICK");
        }
        return "PICK";
      case 9:
        if (setPickOrBan !== null) {
          setPickOrBan("PICK");
        }
        return "PICK";
      case 10:
        if (setPickOrBan !== null) {
          setPickOrBan("BAN");
        }
        return "BAN";
      case 11:
        if (setPickOrBan !== null) {
          setPickOrBan("BAN");
        }
        return "BAN";
      case 12:
        if (setPickOrBan !== null) {
          setPickOrBan("PICK");
        }
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

    this.banHero(randomHero);
    updateAutoBans(this.team, this.bans);
  }

  startReserveCountdown(togglePlayer, callback, updateAutoPicks, updateAutoBans, pickOrBan, setPickOrBan, resetDraftTime, togglePickingTeam) {
    console.log("TAKING RESERVE TIME", this.reserveTime);
    
    this.timerId = setInterval(() => {
      if (this.reserveTime <= 0 && this.draftComplete === false) {
        clearTimeout(this.timerId);
        console.log("TIMES UP, AUTOPICKING HERO");
        switch(this.determinePickOrBan(setPickOrBan)) {
          case "PICK":
            this.autoPick(updateAutoPicks);
            resetDraftTime();
            break;
          case "BAN":
            this.autoBan(updateAutoBans);
            resetDraftTime();
            break;
          default:
            break;
        } 
        togglePlayer(callback, updateAutoPicks, updateAutoBans);
        togglePickingTeam();
        return 0;
      } else if (this.draftComplete === true) {
          return false;
      } else {
        console.log(this.reserveTime);
        this.reserveTime = this.reserveTime - 1;
        callback();
        return this.reserveTime;
      }
    }, 1000);
  }

  stopReserveCountdown() {
    console.log("CLEARING TIMER");
    clearTimeout(this.timerId);
  }
}

module.exports = { Player };