import React from "react";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Jobcreate from "./Pages/Jobcreate";
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/home"/>}/>
                <Route exact path="/index.html" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>} />
                <Route path="/createJob" element={<Jobcreate/>} />
            </Routes>
        </HashRouter>
    );
}
export default App;