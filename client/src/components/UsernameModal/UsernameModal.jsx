import React from 'react'
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import "./UsernameModal.css";

const UsernameModal = ({ closeModal }) => {
    const history = useHistory();

    const handleCancel = () => {
        closeModal();
    }

    const handleSubmission = () => {
        history.push(uuidv4());
    }

    return (
        <div className="UsernameModal">
            <div className="modal-content">
                <h1>Lobby</h1>
                <div className="form-control">
                    <label htmlFor="usernameInput">Username:</label>
                    <input type="text" name="usernameInput"/>
                </div>
                <div className="button-group">
                    <button className="btn" onClick={handleSubmission} >Join</button>
                    <button className="btn" onClick={handleCancel} >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UsernameModal
