import React, { useState, useEffect } from 'react'

import "./CountDown.css";

function CountDown({ lobby }) {
    const [time, setTime] = useState(10);
    const [draftStarted, setDraftStarted] = useState(false);
    const [draftCompleted, setDraftCompleted] = useState(false);

    useEffect(() => {
        if (lobby === null) return false;

        if (lobby.draftCompleted) {
            setDraftCompleted(true);
        }

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

    const renderATimer = () => {
        return draftStarted ? renderDraftTimer() : renderGameStartTimer();
    }

    const renderGameOver = () => (
        <>
            <p>DRAFT OVER!</p>
        </>
    )

    return (
        <div className="CountDown">
            {draftCompleted ? renderGameOver() : renderATimer()}
        </div>
    )
}

export default CountDown
