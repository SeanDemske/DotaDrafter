import React from 'react'
import DrafterPicks from "./DrafterPicks/DrafterPicks";
import DrafterChatbox from "./DrafterChatbox/DrafterChatbox";


import "./RightColumn.css";

function RightColumn() {
    return (
        <div className="RightColumn">
            <DrafterPicks />
            <DrafterChatbox />
        </div>
    )
}

export default RightColumn
