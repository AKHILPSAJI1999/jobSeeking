import React, { useCallback, useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Jobcreate from "./Pages/Jobcreate";
import Singlejobview from "./Pages/Singlejobview";
import Adminjobs from "./Pages/Adminjobs";
import { useSelector } from "react-redux";
import axios from "axios";
import Applicationform from "./Pages/Applicationform";
import Applications from "./Pages/Applications";
const App = () => {
    const [role, setRole] = useState([]);
    const backendurl = useSelector((state) => state.state.backendurl);
    const fetchRole = useCallback(async () => {
        // axios.get(`${backendurl}/security/role`,{
        //     headers:{
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICIyVVMrNlVkamhWemR4Vm43cUVUR2lPQ21uUzh5S3FZNlIrVjZ5Mkd1WXNNPSJ9.eyJqdGkiOiI3NDEzNDgwOGI2ZjU0NDU4YjNjMjliYzAxNjI5MjIxYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAyMjEwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDIyMTAxLCJleHAiOjE3MDkxMDg1MDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.wBsLEUrprGSNXmBA_lTT6BMxlC8-BGIsIwAimm7ZzBlmydDLAOD08INcAWFwgmQ1UbzrPEkScCKkDr6L0FCi_gSexORP514MHOUHDZlhg-OUhUhAYozHCfqB8d3rhooJgvLJKWezqrSyybrqpzGP64dBJlqWtPFFTIvdyiBuF3Z4VunMgwpKa0zQ0PYxY4XlX7HPd31EJJXvGr3cmYWjIUB9P9zGSEazi5AStOiBae5pJJYKUnFRIviPO20lAW-oZM5zV8qzM5TiA3gD6xceyMMVCKrslHZyUdSe0q5pETjhi3kW1F8_Xu0_U_r0adUdSLK3tvxeRMyi9JgDQdBnrg"
        //     }
        // }).then((res)=>{setRole(res.data.data);}).catch((e)=>{console.log(e);});
        axios.get(`${backendurl}/security/role`).then((res) => { setRole(res.data.data); console.log(res.data.data); }).catch((e) => { console.log(e); });
    }, [backendurl]);
    useEffect(() => {
        fetchRole();
    }, [fetchRole]);
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/home" />} />
                <Route exact path="/index.html" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home role={role} />} />
                <Route path="/home/:jobId" element={<Singlejobview role={role} />} />
                <Route path="/createJob" element={<Jobcreate role={role} />} />
                <Route path="/viewJobs" element={<Adminjobs role={role} />} />
                <Route path="/home/:jobId/application" element={<Applicationform role={role} />} />
                <Route path="/myapplications" element={<Applications role={role}/>} />
            </Routes>
        </HashRouter>
    );
}
export default App;