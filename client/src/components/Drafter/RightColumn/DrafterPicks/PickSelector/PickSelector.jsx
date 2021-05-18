import React from 'react'
import Hero from "../../../Hero/Hero";
import { useSelector, useDispatch } from "react-redux";

import "./PickSelector.css";

function PickSelector({ socket }) {
    const selectedHero = useSelector(store => store.selectedHero);
    const dispatch = useDispatch();

    const handleClick = () => {
        console.log("PICKED");
        socket.emit("pickAttempt", selectedHero, (picks, teamname) => {
            dispatch({ type: "UPDATE_PICKS", picks, teamname });
        });
    }

    const renderPickBtn = () => {
        return (
            <div className="pick-ban">
                <button className="btn" onClick={handleClick}>Pick</button>
            </div>
        )
    }

    const renderBanBtn = () => {
        return (
            <div className="pick-ban">
                <button className="btn" onClick={handleClick}>Ban</button>
            </div>
        )
    }

    return (
        <div className="PickSelector">
            <div className="selected-hero">
                <Hero hero={selectedHero} />
                <p className="selected-hero-title">{selectedHero.localized_name}</p>
            </div>
            <div className="pick-ban">
                <button className="btn" onClick={handleClick}>Pick</button>
            </div>
        </div>
    )
}

export default PickSelector
