import React from 'react'

import "./CountDown.css";

function CountDown({ lobby }) {
    let time = 30;
    if (lobby !== null) {
        time = lobby.draftTime;
    }

    return (
        <div className="CountDown">
            <p>YOUR TURN TO PICK</p>
            <p>:{time}</p>
        </div>
    )
}

export default CountDown
