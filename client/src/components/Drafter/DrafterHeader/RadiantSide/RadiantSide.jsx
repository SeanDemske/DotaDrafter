import React from 'react'

import "./RadiantSide.css";

function RadiantSide({ lobby }) {

    const renderUsername = () => {
        if (lobby !== null && lobby.playerRadiant !== undefined) return <h2>{lobby.playerRadiant.username}</h2>
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
                <p>Reserve: 2:25</p>
            </div>
        </div>
    );
}

export default RadiantSide;
