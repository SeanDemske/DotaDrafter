import React from 'react'

import "./UsernameModal.css";

const UsernameModal = ({ closeModal }) => {
    
    const handleSubmission = () => {
        closeModal();
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
                </div>
            </div>
        </div>
    );
}

export default UsernameModal
