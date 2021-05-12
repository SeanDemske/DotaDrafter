import React from 'react'
import "./Hero.css";

function Hero({ hero, handleClick = (() => null) }) {


    return (
        <div onClick={() => handleClick(hero)} className="Hero">
            <img src={hero.name === "unselected_hero" ? hero.img : `http://cdn.dota2.com${hero.img}`} alt="Hero"/>
            <p className="hero-name">{hero.localized_name}</p>
        </div>
    )
}

export default Hero

// `http://cdn.dota2.com${hero.img}`