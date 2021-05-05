import React from 'react'
import Hero from "../../../Hero/Hero";
import axe from "../../../../../temp_axe";

import "./PickSelector.css";

function PickSelector() {
    return (
        <div className="PickSelector">
            <div className="selected-hero">
                <Hero hero={axe["2"]} />
                <p className="selected-hero-title">Axe</p>
            </div>
            <div className="pick-ban">
                <button className="btn">Pick</button>
            </div>
        </div>
    )
}

export default PickSelector
