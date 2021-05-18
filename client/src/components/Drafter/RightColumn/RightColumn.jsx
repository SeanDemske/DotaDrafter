import React from 'react'
import DrafterPicks from "./DrafterPicks/DrafterPicks";
import DrafterChatbox from "./DrafterChatbox/DrafterChatbox";


import "./RightColumn.css";

function RightColumn({ socket }) {
    return (
        <div className="RightColumn">
            <DrafterPicks socket={socket} />
            <DrafterChatbox />
        </div>
    )
}

export default RightColumn
