const { Lobby } = require("../classes/Lobby");
const { Player } = require("../classes/Player");

const getLobbyById = (lobbyId, Lobbies) => {
    if (Lobbies[lobbyId] === undefined) return false
    return Lobbies[lobbyId];
}

const lobbyJoin = (lobbyId, Lobbies, playerId) => {
    // Lobby exists
    if (Lobbies[lobbyId]) {
        // Add player to existing lobby if it's not full, otherwise return false
        const activeLobby = Lobbies[lobbyId];
        if (activeLobby.lobbyFull === false) {
            const newPlayer = new Player(playerId, lobbyId)
            activeLobby.addPlayer(newPlayer);
            return newPlayer;
        } else {
            return false;
        }
    } else {
        // Lobby does not exist, create new one
        Lobbies[lobbyId] = new Lobby(lobbyId);
        const activeLobby = Lobbies[lobbyId]
        const newPlayer = new Player(playerId, lobbyId)
        activeLobby.addPlayer(newPlayer);
        return newPlayer;
    }
}

const lobbyLeave = (player, Lobbies) => {
    const activeLobby = getLobbyById(player.lobbyId, Lobbies);

    // Remove player from lobby
    activeLobby[`player${player.team}`] = null;

    // If all players are gone, remove lobby
    if (activeLobby.playerRadiant === null && activeLobby.playerDire === null) {
        delete Lobbies[activeLobby.id];
        console.log("lobby deleted");
    }

    return activeLobby;
}

module.exports = { lobbyJoin, lobbyLeave, getLobbyById };