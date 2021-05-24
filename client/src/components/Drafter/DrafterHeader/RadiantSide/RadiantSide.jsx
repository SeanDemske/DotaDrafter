import React from 'react'

import "./RadiantSide.css";

function RadiantSide({ lobby }) {

    let reserveTime = 0;
    const renderUsername = () => {
        if (lobby !== null && lobby.playerRadiant !== undefined) return <h2>{lobby.playerRadiant.username}</h2>
    }

    if (lobby !== null && lobby.playerRadiant !== null) {
        reserveTime = lobby.playerRadiant.reserveTime;
    }

    const renderWaiting = () => (
        <h2>Waiting for player...</h2>
    );

    return (
        <div className="header-radiant">
            <div className="radiant-left-panel">
                <h1>Radiant</h1>
                {lobby !== null && lobby.playerRadiant !== null ? renderUsername() : renderWaiting()}
            </div>
            <div className="radiant-right-panel">
                <p>Reserve: {reserveTime}</p>
            </div>
        </div>
    );
}

export default RadiantSide;
