import React, { useState, useEffect } from 'react'

import "./CountDown.css";

function CountDown({ lobby }) {
    const [time, setTime] = useState(10);
    const [draftStarted, setDraftStarted] = useState(false);

    useEffect(() => {
        if (lobby === null) return false;

        if (lobby.gameStartCountdown > 0) {
            setTime(lobby.gameStartCountdown)
        } else if (lobby.gameStartCountdown <= 0) {
            setDraftStarted(true);
            setTime(lobby.draftTime);
        }
    }, [lobby]);

    const renderGameStartTimer = () => (
        <>
            <p>STARTING GAME</p>
            <p>:{time}</p>
        </>
    )

    const renderDraftTimer = () => (
        <>
            <p>YOUR TURN TO PICK</p>
            <p>:{time}</p>
        </>
    )

    return (
        <div className="CountDown">
            {draftStarted ? renderDraftTimer() : renderGameStartTimer()}
        </div>
    )
}

export default CountDown
