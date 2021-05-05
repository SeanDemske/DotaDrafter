
// Returns a list(obj) of agility heroes
const formatAgiHeroes = (heroes) => {
    return Object.fromEntries(Object.entries(heroes).filter(([heroId, hero]) => hero.primary_attr === "agi"));
}

// Returns a list(obj) of intelligence heroes
const formatIntHeroes = (heroes) => {
    return Object.fromEntries(Object.entries(heroes).filter(([heroId, hero]) => hero.primary_attr === "int"));
}

// Returns a list(obj) of strength heroes
const formatStrHeroes = (heroes) => {
    return Object.fromEntries(Object.entries(heroes).filter(([heroId, hero]) => hero.primary_attr === "str"));
}

export {
    formatAgiHeroes,
    formatIntHeroes,
    formatStrHeroes
}