import React from 'react'
import "./Hero.css";

function Hero({ hero }) {
    return (
        <div className="Hero">
            <img src={`http://cdn.dota2.com${hero.img}`} alt="Hero"/>
            <p className="hero-name">{hero.localized_name}</p>
        </div>
    )
}

export default Hero
