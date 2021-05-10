import React, { useState } from 'react'
import { useDispatch } from "react-redux";

import "./UsernameModal.css";

const UsernameModal = ({ closeModal, socket }) => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUsername(e.target.value);
    }
    
    const handleSubmission = () => {
        socket.emit("submitUsername", (username), (playerData, lobbyData) => {
            console.log("updating username", username);
            dispatch({ type: "UPDATE_LOBBY_STATE", lobbyData });
            dispatch({ type: "UPDATE_PLAYER_STATE", playerData });
        });
        closeModal();
    }

    return (
        <div className="UsernameModal">
            <div className="modal-content">
                <h1>Lobby</h1>
                <div className="form-control">
                    <label htmlFor="usernameInput">Username:</label>
                    <input type="text" name="usernameInput" onChange={handleChange} value={username}/>
                </div>
                <div className="button-group">
                    <button className="btn" onClick={handleSubmission} >Join</button>
                </div>
            </div>
        </div>
    );
}

export default UsernameModal
