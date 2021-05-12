import React from 'react'
import Hero from "../../../Hero/Hero";
import { useSelector } from "react-redux";

import "./PickSelector.css";

function PickSelector() {
    const selectedHero = useSelector(store => store.selectedHero);

    return (
        <div className="PickSelector">
            <div className="selected-hero">
                <Hero hero={selectedHero} />
                <p className="selected-hero-title">{selectedHero.localized_name}</p>
            </div>
            <div className="pick-ban">
                <button className="btn">Pick</button>
            </div>
        </div>
    )
}

export default PickSelector
