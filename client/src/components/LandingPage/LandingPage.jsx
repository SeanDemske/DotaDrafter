import React from 'react'
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import DotaLogo from "../../images/dotalogo.png";


import "./LandingPage.css";

function LandingPage() {
    
    return (
        <div className="LandingPage">
            <h1>DoTA<br/>Drafter</h1>
            <img src={DotaLogo} alt="Dota 2"/>
            <Link to={`/${uuidv4()}`} className="btn" >Create Lobby</Link>
        </div>
    );
}

export default LandingPage;
