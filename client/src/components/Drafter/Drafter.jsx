import { useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import DrafterHeader from "./DrafterHeader/DrafterHeader";
import LeftColumn from "./LeftColumn/LeftColumn";
import RightColumn from "./RightColumn/RightColumn";
import io from "socket.io-client";

import "./Drafter.css";

let socket;

function Drafter() {
    const location = useLocation().pathname.substr(1);

    useEffect(() => {


        socket = io("localhost:5000");

        socket.emit("join", (location))
        
        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, [location]);

    return (
        <div className="Drafter-container">
            <DrafterHeader />
            <div className="Columns-container">
                <LeftColumn />
                <RightColumn />
            </div>
        </div>
    );
}

export default Drafter;
