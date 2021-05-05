import React from 'react'
import RadiantSide from "./RadiantSide/RadiantSide";
import CountDown from "./CountDown/CountDown";
import DireSide from "./DireSide/DireSide";

import "./DrafterHeader.css";

function DrafterHeader() {
    return (
        <div className="DrafterHeader">
            <RadiantSide />
            <CountDown />
            <DireSide />
        </div>
    );
}

export default DrafterHeader;
