import React, { useState } from 'react'
import UsernameModal from "../UsernameModal/UsernameModal";
import DotaLogo from "../../images/dotalogo.png";

import "./LandingPage.css";

function LandingPage() {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="LandingPage">
            {modalOpen ? <UsernameModal closeModal={closeModal} /> : null}
            <h1>DoTA<br/>Drafter</h1>
            <img src={DotaLogo} alt="Dota 2"/>
            <button className="btn" onClick={openModal} >Create Lobby</button>
        </div>
    );
}

export default LandingPage;
