import React from 'react'
import PicksDisplay from "./PicksDisplay/PicksDisplay";
import PickSelector from "./PickSelector/PickSelector";

import "./DrafterPicks.css";

function DrafterPicks({ socket }) {
    return (
        <div className="DrafterPicks">
            <PicksDisplay team={"Radiant"} />
            <PicksDisplay team={"Dire"} />
            <PickSelector socket={socket} />
        </div>
    )
}

export default DrafterPicks
