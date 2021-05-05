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
const { lobbyJoin, getLobbyById } = require("./utils/handleJoin");



/////////////////////////
// Lobby Store
/////////////////////////////
const Lobbies = {}



/////////////////////////
// Sockets
/////////////////////////////
io.on("connection", (socket) => {
    console.log("Socket connection made", socket.id);
    let activeLobby;

    socket.on("join", (lobbyId) => {
        if (lobbyJoin(lobbyId, Lobbies, socket.id)) {
            // Lobby successfully created
            activeLobby = getLobbyById(lobbyId, Lobbies);
        } else {
            // Lobby full
            console.log("lobby full, you get the boot");
        }
        console.log(activeLobby);
    });

    socket.on("disconnect", () => {
        console.log("client disconnected");
    });
});



server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
