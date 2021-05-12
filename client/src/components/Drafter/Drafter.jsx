import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import DrafterHeader from "./DrafterHeader/DrafterHeader";
import LeftColumn from "./LeftColumn/LeftColumn";
import RightColumn from "./RightColumn/RightColumn";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import UsernameModal from "../UsernameModal/UsernameModal";
import { useHistory } from "react-router-dom";

import "./Drafter.css";

let socket;

function Drafter() {
    let history = useHistory();
    const location = useLocation().pathname.substr(1);
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(true);

    const closeModal = () => {
        setModalOpen(false);
    }
    
    if (!store) closeModal();

    useEffect(() => {
        socket = io("localhost:5000");

        socket.emit("join", (location), (playerData, lobbyData) => {
            console.log("updating store...");
            dispatch({ type: "UPDATE_LOBBY_STATE", lobbyData });
            dispatch({ type: "UPDATE_PLAYER_STATE", playerData });
        });
        
        return () => {
            socket.disconnect();
        }
    }, [location, dispatch]);

    useEffect(() => {
        socket.on("playerConnection", (lobbyData) => {
            dispatch({ type: "UPDATE_LOBBY_STATE", lobbyData });
        });
    }, [dispatch]);

    useEffect(() => {
        socket.on("playerNameUpdate", (lobbyData) => {
            dispatch({ type: "UPDATE_LOBBY_STATE", lobbyData });
        });
    }, [dispatch]);

    useEffect(() => {
        socket.on("fullLobby", () => {
            dispatch({ type: "RESET_STATE" });
            history.push("/");
        });
    }, [dispatch, history]);

    useEffect(() => {
        socket.on("countdownTick", (countdownData) => {
            dispatch({ type: "UPDATE_COUNTDOWN", countdownData});
        });
    }, [dispatch]);



    let draftTime = 30;
    if (store.lobby !== null) {
        draftTime = store.lobby.draftTime
    }

    return (
        <>
            {modalOpen ? <UsernameModal closeModal={closeModal} socket={socket} /> : null}
            <div className="Drafter-container">
                <DrafterHeader draftTime={draftTime} />
                <div className="Columns-container">
                    <LeftColumn />
                    <RightColumn />
                </div>
            </div>
        </>
    );
}

export default Drafter;
