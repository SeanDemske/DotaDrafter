import React from 'react'
import PicksDisplay from "./PicksDisplay/PicksDisplay";
import PickSelector from "./PickSelector/PickSelector";

import "./DrafterPicks.css";

function DrafterPicks() {
    return (
        <div className="DrafterPicks">
            <PicksDisplay team={"Radiant"} />
            <PicksDisplay team={"Dire"} />
            <PickSelector />
        </div>
    )
}

export default DrafterPicks
