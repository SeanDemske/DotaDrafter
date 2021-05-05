import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import "./stylemodules/buttons.css";

import LandingPage from "./components/LandingPage/LandingPage";
import Drafter from "./components/Drafter/Drafter";

const App = () => (
    <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/:lobbyId" component={Drafter} />
    </Router>
);

export default App;