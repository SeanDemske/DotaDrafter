import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import Hero from "../../../Hero/Hero";

import "./PicksDisplay.css";

function PicksDisplay({ team = "UNDEFINED" }) {
    const lobby = useSelector(store => store.lobby);
    let picks = [];
    let bans = [];

    if (lobby !== null) {
        picks = lobby[`player${team}`] !== null ? lobby[`player${team}`].picks : [];
        bans = lobby[`player${team}`] !== null ? lobby[`player${team}`].bans : [];
    }


    return (
        <div className="PicksDisplay">
            <h1 className={`${team}`} >{team}</h1>
            <div className="picks-display">
                <p>Picks</p>
                <div className="heroes-container">
                    {picks.map((pick) => {
                        return <div key={uuidv4()} className="hero-wrapper"><Hero hero={pick} /></div>
                    })}
                </div>
            </div>

            <div className="bans-display">
                <p>Bans</p>
                <div className="heroes-container">
                    {bans.map((pick) => {
                        return <div key={uuidv4()} className="hero-wrapper"><Hero hero={pick} /></div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default PicksDisplay;
