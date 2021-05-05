import React from 'react'
import Hero from "../../../Hero/Hero";
import temp_picks from "../../../../../temp_picks";
import temp_bans from "../../../../../temp_bans";

import "./PicksDisplay.css";

function PicksDisplay({ team = "UNDEFINED" }) {
    return (
        <div className="PicksDisplay">
            <h1 className={`${team}`} >{team}</h1>
            <div className="picks-display">
                <p>Picks</p>
                <div className="heroes-container">
                    {Object.entries(temp_picks).map(([heroId, heroData]) => {
                            return <Hero key={heroId} hero={heroData} />
                    })}
                </div>
            </div>

            <div className="bans-display">
                <p>Bans</p>
                <div className="heroes-container">
                    {Object.entries(temp_bans).map(([heroId, heroData]) => {
                            return <Hero key={heroId} hero={heroData} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default PicksDisplay;
