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
            activeLobby.addPlayer(new Player(playerId));
            return activeLobby;
        } else {
            return false;
        }
    } else {
        // Lobby does not exist, create new one
        Lobbies[lobbyId] = new Lobby(lobbyId);
        const activeLobby = Lobbies[lobbyId]
        activeLobby.addPlayer(new Player(playerId));
        return activeLobby;
    }
}

module.exports = { lobbyJoin, getLobbyById };