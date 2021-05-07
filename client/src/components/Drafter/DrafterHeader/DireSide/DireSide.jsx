import React from 'react'

import "./DireSide.css";

function DireSide({ lobby }) {

    const renderUsername = () => {
        if (lobby !== null && lobby.playerDire !== undefined) return <h2>{lobby.playerDire.username}</h2>
    }

    const renderWaiting = () => (
        <h2>Waiting for player...</h2>
    );

    return (
        <div className="header-dire">
            <div className="dire-left-panel">
                <p>Reserve: 2:25</p>
            </div>
            <div className="dire-right-panel">
                <h1>Dire</h1>
                {lobby !== null && lobby.playerDire !== null ? renderUsername() : renderWaiting()}
            </div>
        </div>
    );
}

export default DireSide;