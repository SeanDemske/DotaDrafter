import React from 'react'
import formatTime from "../../../../utils/formatTime";
import "./DireSide.css";

function DireSide({ lobby }) {

    let reserveTime = 0;
    const renderUsername = () => {
        if (lobby !== null && lobby.playerDire !== undefined) return <h2>{lobby.playerDire.username}</h2>
    }

    if (lobby !== null && lobby.playerDire !== null) {
        reserveTime = lobby.playerDire.reserveTime;
    }

    const renderWaiting = () => (
        <h2>Waiting for player...</h2>
    );

    return (
        <div className="header-dire">
            <div className="dire-left-panel">
                <p>Reserve: {formatTime(reserveTime)}</p>
            </div>
            <div className="dire-right-panel">
                <h1>Dire</h1>
                {lobby !== null && lobby.playerDire !== null ? renderUsername() : renderWaiting()}
            </div>
        </div>
    );
}

export default DireSide;