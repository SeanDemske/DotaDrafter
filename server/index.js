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
}
const io = socketio(server, options);

app.use(cors());





/////////////////////////
// Logic Dependencies
/////////////////////////////
const { lobbyJoin, lobbyLeave, getLobbyById } = require("./utils/handleJoin");



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
                // Start the draft
                activeLobby.startDraft(() => {
                    io.to(activeLobby.id).emit("countdownTick", activeLobby.draftTime);
                })
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

    socket.on("disconnect", () => {
        if (activePlayer && Lobbies) {
            lobbyLeave(activePlayer, Lobbies);
        }

        console.log("client disconnected");
    });
});



server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
