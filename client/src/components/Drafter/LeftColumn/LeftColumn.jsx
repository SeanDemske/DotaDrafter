import React from 'react'
import DrafterHeroPool from "./DrafterHeroPool/DrafterHeroPool";

import "./LeftColumn.css";

function LeftColumn({ hero_data }) {
    return (
        <div className="LeftColumn">
            <DrafterHeroPool hero_data={hero_data} />
        </div>
    );
}

export default LeftColumn;
