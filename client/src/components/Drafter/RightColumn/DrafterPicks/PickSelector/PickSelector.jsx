import React, { useState } from 'react'
import Hero from "../../../Hero/Hero";
import { useSelector, useDispatch } from "react-redux";

import "./PickSelector.css";

function PickSelector({ socket }) {
    const selectedHero = useSelector(store => store.selectedHero);
    const lobby = useSelector(store => store.lobby);
    const player = useSelector(store => store.player);
    const dispatch = useDispatch();

    const [btnDisabled, setBtnDisabled] = useState(true);

    let pickOrBan = "BAN";

    if (lobby !== null) {
        pickOrBan = lobby.switchPickBan;
    }

    if (player !== null && btnDisabled === true) {
        if (player.team === lobby.teamToPick) {
            setBtnDisabled(false);
        }
    }

    if (player !== null && btnDisabled === false) {
        if (player.team !== lobby.teamToPick) {
            setBtnDisabled(true);
        }
    }

    const handlePick = () => {
        socket.emit("pickAttempt", selectedHero, (picks, teamname) => {
            dispatch({ type: "UPDATE_PICKS", picks, teamname });
        });
    }

    const handleBan = () => {
        socket.emit("banAttempt", selectedHero, (bans, teamname) => {
            dispatch({ type: "UPDATE_BANS", bans, teamname });
        });
    }

    const renderPickBtn = () => {
        return (
            <div className="pick-ban">
                <button disabled={btnDisabled} className="btn" onClick={handlePick}>Pick</button>
            </div>
        )
    }

    const renderBanBtn = () => {
        return (
            <div className="pick-ban">
                <button disabled={btnDisabled} className="btn btn-ban" onClick={handleBan}>Ban</button>
            </div>
        )
    }

    return (
        <div className="PickSelector">
            <div className="selected-hero">
                <Hero hero={selectedHero} />
                <p className="selected-hero-title">{selectedHero.localized_name}</p>
            </div>
            {pickOrBan === "BAN" ? renderBanBtn() : renderPickBtn()}
        </div>
    )
}

export default PickSelector
