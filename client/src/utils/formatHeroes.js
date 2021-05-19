
// Returns a list(obj) of agility heroes
const formatAgiHeroes = (heroes) => {
    return Object.fromEntries(Object.entries(heroes).filter(([heroId, hero]) => hero.primary_attr === "agi" && hero.selected === undefined));
}

// Returns a list(obj) of intelligence heroes
const formatIntHeroes = (heroes) => {
    return Object.fromEntries(Object.entries(heroes).filter(([heroId, hero]) => hero.primary_attr === "int"));
}

// Returns a list(obj) of strength heroes
const formatStrHeroes = (heroes) => {
    return Object.fromEntries(Object.entries(heroes).filter(([heroId, hero]) => hero.primary_attr === "str"));
}

const updateHeroPool = (heroPool, heroes) => {
    for (const hero of heroes) {
        if (hero.id !== 9001) { // Not the unselected hero, aka an actual hero
            delete heroPool[hero.id];
        }
    }
}

export {
    formatAgiHeroes,
    formatIntHeroes,
    formatStrHeroes,
    updateHeroPool
}