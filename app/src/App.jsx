import React from "react";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Jobcreate from "./Pages/Jobcreate";
import Singlejobview from "./Pages/Singlejobview";
import Adminjobs from "./Pages/Adminjobs";
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/home"/>}/>
                <Route exact path="/index.html" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>} />
                <Route path="/home/:jobId" element={<Singlejobview/>} />
                <Route path="/createJob" element={<Jobcreate/>} />
                <Route path="/viewJobs" element={<Adminjobs/>} />
            </Routes>
        </HashRouter>
    );
}
export default App;