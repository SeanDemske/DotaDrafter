import React from 'react'
import "./ChatMessage.css";

const ChatMessage = ( {msg: { team, username, msg }} ) => {
    return (
        <li className="DrafterChatBox-message">
            <span className={`msg msg-${team}`}>{username}</span>
            : {msg}
        </li>
    )
}

export default ChatMessage;
