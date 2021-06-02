/////////////////////////
// Server Setup
/////////////////////////////
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const options={
    cors:true,
    origins:["http://localhost:5000"],
    pingTimeout: 180000,
    pingInterval: 25000
}
const io = socketio(server, options);

app.use(cors());





/////////////////////////
// Logic Dependencies
/////////////////////////////
const { lobbyJoin, lobbyLeave, getLobbyById } = require("./utils/handleLobby");



/////////////////////////
// Lobby Store
/////////////////////////////
const Lobbies = {}



/////////////////////////
// Sockets
/////////////////////////////
io.on("connection", (socket) => {
    console.log("Socket connection made", socket.id);
    let activePlayer = null;

    socket.on("join", (lobbyId, callback) => {
        activePlayer = lobbyJoin(lobbyId, Lobbies, socket.id);
        let activeLobby = null;
        if (activePlayer) { 
            // Add client to socket room and emit to the room that there's a connection
            console.log("Successfully joined lobby")
            activeLobby = getLobbyById(activePlayer.lobbyId, Lobbies);
            socket.join(lobbyId);
            io.to(lobbyId).emit("playerConnection", activeLobby);
            callback(activePlayer, activeLobby);

            if (activeLobby.lobbyFull === true) {
                // Start the game
                activeLobby.startGameCountdown(() => {
                    let radiantReserve = 0;
                    let direReserve = 0;
                    if (activeLobby.playerRadiant !== null) radiantReserve = activeLobby.playerRadiant.reserveTime;
                    if (activeLobby.playerDire !== null) direReserve = activeLobby.playerDire.reserveTime;
                    io.to(activeLobby.id).emit("countdownTick", {
                        draftCompleted: activeLobby.draftCompleted,
                        draftTime: activeLobby.draftTime, 
                        gameStartCountdown: activeLobby.gameStartCountdown, 
                        draftInProgress: activeLobby.draftInProgress, 
                        teamToPick: activeLobby.teamToPick,
                        radiantReserve,
                        direReserve
                    });
                }, (teamname, picks) => {
                    let pickOrBan = activeLobby.inactivePlayer.determinePickOrBan(activeLobby.setPickOrBan);
                    io.to(activeLobby.id).emit("pickSuccess", picks, `player${teamname}`, activeLobby.teamToPick, pickOrBan);
                    console.log("UPDATING AUTO PICKS")
                }, (teamname, picks) => {
                    let pickOrBan = activeLobby.inactivePlayer.determinePickOrBan(activeLobby.setPickOrBan);
                    io.to(activeLobby.id).emit("banSuccess", picks, `player${teamname}`, activeLobby.teamToPick, pickOrBan);
                });
            }
        } else { 
            // emit to client that the lobby was full, could not join
            console.log("Failed to join lobby, most likely full");
            io.to(socket.id).emit("fullLobby");
        }
    });


    socket.on("submitUsername", (username, callback) => {
        if (!activePlayer) return false;  // Security measure

        // Assign username to activeplayer object
        activePlayer.username = username;

        // Update lobby and send data back to client
        let activeLobby = getLobbyById(activePlayer.lobbyId, Lobbies);
        activeLobby[`player${activePlayer.team}`] = activePlayer;
        callback(activePlayer, activeLobby);

        // Send data to lobby
        io.to(activeLobby.id).emit("playerNameUpdate", activeLobby);
    });

    socket.on("pickAttempt", (hero, callback) => {
        if (!activePlayer) return false;
        if (activePlayer.picks.find( pick => pick.id === hero.id )) return false; // No duplicate picks

        let activeLobby = getLobbyById(activePlayer.lobbyId, Lobbies);
        if (activeLobby.teamToPick !== activePlayer.team) return false; // Only correct player can pick
        if (activeLobby.draftCompleted) return false; // Cant pick after drafts over

        console.log("attempted to pick hero");
        if (activeLobby.switchPickBan !== "PICK") return false; // Must be in picking mode
        activeLobby.setPickOrBan(activePlayer.determinePickOrBan());
        activePlayer.pickHero(hero, activeLobby.setPickOrBan);
        let pickOrBan = activeLobby.inactivePlayer.determinePickOrBan(activeLobby.setPickOrBan);
        activePlayer.stopReserveCountdown();
        activeLobby.togglePickingTeam();
        activeLobby.resetDraftTime();
        activeLobby.toggleActivePlayer(() => {
            let radiantReserve = 0;
            let direReserve = 0;
            if (activeLobby.playerRadiant !== null) radiantReserve = activeLobby.playerRadiant.reserveTime;
            if (activeLobby.playerDire !== null) direReserve = activeLobby.playerDire.reserveTime;
            io.to(activeLobby.id).emit("countdownTick", {
                draftCompleted: activeLobby.draftCompleted,
                draftTime: activeLobby.draftTime, 
                gameStartCountdown: activeLobby.gameStartCountdown, 
                draftInProgress: activeLobby.draftInProgress, 
                teamToPick: activeLobby.teamToPick,
                radiantReserve,
                direReserve
            });
        }, (teamname, picks) => {
            let pickOrBan = activeLobby.inactivePlayer.determinePickOrBan(activeLobby.setPickOrBan);
            io.to(activeLobby.id).emit("pickSuccess", picks, `player${teamname}`, activeLobby.teamToPick, pickOrBan);
            console.log("UPDATING AUTO PICKS")
        }, (teamname, picks) => {
            let pickOrBan = activeLobby.inactivePlayer.determinePickOrBan(activeLobby.setPickOrBan);
            io.to(activeLobby.id).emit("banSuccess", picks, `player${teamname}`, activeLobby.teamToPick, pickOrBan);
        });

        callback(activePlayer.picks, `player${activePlayer.team}`);

        // console.log(activeLobby);

        // Send data to lobby
        io.to(activeLobby.id).emit("pickSuccess", activePlayer.picks, `player${activePlayer.team}`, activeLobby.teamToPick, pickOrBan);
    })

    socket.on("banAttempt", (hero, callback) => {
        if (!activePlayer) return false;
        if (activePlayer.bans.find( ban => ban.id === hero.id )) return false; // No duplicate bans

        let activeLobby = getLobbyById(activePlayer.lobbyId, Lobbies);
        if (activeLobby.teamToPick !== activePlayer.team) return false; // Only correct player can pick
        if (activeLobby.draftCompleted) return false; // Cant pick after drafts over

        console.log("attempted to ban hero");
        if (activeLobby.switchPickBan !== "BAN") return false; // Must be in banning mode
        activeLobby.setPickOrBan(activePlayer.determinePickOrBan());
        activePlayer.banHero(hero, activeLobby.setPickOrBan);
        let pickOrBan = activeLobby.inactivePlayer.determinePickOrBan(activeLobby.setPickOrBan);
        activePlayer.stopReserveCountdown();
        activeLobby.togglePickingTeam();
        activeLobby.resetDraftTime();
        activeLobby.toggleActivePlayer(() => {
            let radiantReserve = 0;
            let direReserve = 0;
            if (activeLobby.playerRadiant !== null) radiantReserve = activeLobby.playerRadiant.reserveTime;
            if (activeLobby.playerDire !== null) direReserve = activeLobby.playerDire.reserveTime;
            io.to(activeLobby.id).emit("countdownTick", {
                draftCompleted: activeLobby.draftCompleted,
                draftTime: activeLobby.draftTime, 
                gameStartCountdown: activeLobby.gameStartCountdown, 
                draftInProgress: activeLobby.draftInProgress, 
                teamToPick: activeLobby.teamToPick,
                radiantReserve,
                direReserve
            });
        }, (teamname, picks) => {
            let pickOrBan = activeLobby.inactivePlayer.determinePickOrBan(activeLobby.setPickOrBan);
            io.to(activeLobby.id).emit("pickSuccess", picks, `player${teamname}`, activeLobby.teamToPick, pickOrBan);
            console.log("UPDATING AUTO PICKS")
        }, (teamname, picks) => {
            let pickOrBan = activeLobby.inactivePlayer.determinePickOrBan(activeLobby.setPickOrBan);
            io.to(activeLobby.id).emit("banSuccess", picks, `player${teamname}`, activeLobby.teamToPick, pickOrBan);
        });

        callback(activePlayer.bans, `player${activePlayer.team}`);

        // console.log(activeLobby);

        // Send data to lobby
        io.to(activeLobby.id).emit("banSuccess", activePlayer.bans, `player${activePlayer.team}`, activeLobby.teamToPick, pickOrBan);
    })

    socket.on("disconnect", (reason) => {
        if (activePlayer && Lobbies) {
            lobbyLeave(activePlayer, Lobbies);
        }

        console.log("client disconnected", reason);
    });
});



server.listen(PORT, () => console.log(`Listening on port ${PORT}`));