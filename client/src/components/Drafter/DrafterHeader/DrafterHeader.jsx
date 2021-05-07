import React from 'react'
import RadiantSide from "./RadiantSide/RadiantSide";
import CountDown from "./CountDown/CountDown";
import DireSide from "./DireSide/DireSide";
import { useSelector } from "react-redux";

import "./DrafterHeader.css";

function DrafterHeader() {
    const lobby = useSelector(store => store.lobby);
    console.log(lobby);
    return (
        <div className="DrafterHeader">
            <RadiantSide lobby={lobby}/>
            <CountDown />
            <DireSide lobby={lobby}/>
        </div>
    );
}

export default DrafterHeader;
