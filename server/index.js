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
            console.log("Successfully joined lobby")
            activeLobby = getLobbyById(activePlayer.lobbyId, Lobbies);
        } else {
            console.log("Failed to join lobby");
        }
        callback(activePlayer, activeLobby);
    });

    socket.on("disconnect", () => {
        if (activePlayer && Lobbies) {
            lobbyLeave(activePlayer, Lobbies);
        }

        console.log("client disconnected");
    });
});



server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
