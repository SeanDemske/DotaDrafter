import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage/ChatMessage";

import "./DrafterChatbox.css";

function DrafterChatbox({ socket }) {
    const dispatch = useDispatch();
    const lobby = useSelector(store => store.lobby);
    const [textVal, setTextVal] = useState("");

    const handleChange = (e) => {
        setTextVal(e.target.value);
    }

    const handleKeyPress = (target) => {
        if(target.charCode === 13 && textVal !== ""){
            socket.emit("sendMsg", textVal, (messages) => {
                dispatch({ type: "UPDATE_CHATBOX", messages});
            });  
            setTextVal("");
        } 
    }

    return (
        <div className="DrafterChatbox">
            <ul className="DrafterChatBox-messages">
                {lobby !== null ? lobby.chat.messages.map((msg, i) => <ChatMessage key={i} msg={msg}/>) : null}
            </ul>
            <input onKeyPress={handleKeyPress} onChange={handleChange} type="text" className="DrafterChatBox-textfield" placeholder="Say something..." value={textVal}/>
        </div>
    );
}

export default DrafterChatbox;
