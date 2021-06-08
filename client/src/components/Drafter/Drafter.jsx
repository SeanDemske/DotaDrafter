import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import DrafterHeader from "./DrafterHeader/DrafterHeader";
import LeftColumn from "./LeftColumn/LeftColumn";
import RightColumn from "./RightColumn/RightColumn";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import UsernameModal from "../UsernameModal/UsernameModal";
import { useHistory } from "react-router-dom";
import { updateHeroPool } from "../../utils/formatHeroes";
import hero_data from "../../hero_data";

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
        socket = io("https://dota2-drafter.herokuapp.com/");

        socket.emit("join", (location), (playerData, lobbyData) => {
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

    useEffect(() => {
        socket.on("pickSuccess", (picks, teamname, pickingTeam, pickBanMode) => {
            dispatch({ type: "UPDATE_PICKS", picks, teamname});
            dispatch({ type: "UPDATE_PICK_BAN_STATE", pickingTeam, pickBanMode});
            updateHeroPool(hero_data, picks);
        });
    }, [dispatch]);

    useEffect(() => {
        socket.on("banSuccess", (bans, teamname, pickingTeam, pickBanMode) => {
            dispatch({ type: "UPDATE_BANS", bans, teamname});
            dispatch({ type: "UPDATE_PICK_BAN_STATE", pickingTeam, pickBanMode});
            updateHeroPool(hero_data, bans);
        });
    }, [dispatch]);

    useEffect(() => {
        socket.on("msgSent", (messages) => {
            dispatch({ type: "UPDATE_CHATBOX", messages});
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
                    <LeftColumn hero_data={hero_data} />
                    <RightColumn socket={socket} />
                </div>
            </div>
        </>
    );
}

export default Drafter;
