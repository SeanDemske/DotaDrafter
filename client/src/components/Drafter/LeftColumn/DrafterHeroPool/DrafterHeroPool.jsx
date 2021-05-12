import React from 'react'
import { useDispatch } from "react-redux";
import temp_data from "../../../../temp_data";
import { formatAgiHeroes, formatIntHeroes, formatStrHeroes } from "../../../../utils/formatHeroes";
import Hero from "../../Hero/Hero";
import Tilt from 'react-tilt'

import "./DrafterHeroPool.css";


function DrafterHeroPool() {
    const dispatch = useDispatch();
    const agiHeroes = formatAgiHeroes(temp_data);
    const intHeroes = formatIntHeroes(temp_data);
    const strHeroes = formatStrHeroes(temp_data);

    const handleClick = (selectedHero) => {
        console.log("clicked");
        dispatch({ type: "UPDATE_SELECTED_HERO_STATE", selectedHero });
    }

    return (
        <div className="DrafterHeroPool">
            <div className="category-container">
                <h1>Strength</h1>
                <div className="heroes-container">
                    {Object.entries(strHeroes).map(([heroId, heroData]) => {
                        return <Tilt key={heroId} className="Tilt" options={{ max : 25 }} ><Hero handleClick={handleClick} key={heroId} hero={heroData} /></Tilt>
                    })}
                </div>
            </div>

            <div className="category-container">
                <h1>Agility</h1>
                <div className="heroes-container">
                    {Object.entries(agiHeroes).map(([heroId, heroData]) => {
                        return <Tilt key={heroId} className="Tilt" options={{ max : 25 }} ><Hero handleClick={handleClick} key={heroId} hero={heroData} /></Tilt>
                    })}
                </div>
            </div>

            <div className="category-container">
                <h1>Intelligence</h1>
                <div className="heroes-container">
                    {Object.entries(intHeroes).map(([heroId, heroData]) => {
                        return <Tilt key={heroId} className="Tilt" options={{ max : 25 }} ><Hero handleClick={handleClick} hero={heroData} /></Tilt>
                    })}
                </div>
            </div>
        </div>
    )
}

export default DrafterHeroPool
