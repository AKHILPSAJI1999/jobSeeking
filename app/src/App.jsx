import React, { useCallback, useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Jobcreate from "./Pages/Jobcreate";
import Singlejobview from "./Pages/Singlejobview";
import Adminjobs from "./Pages/Adminjobs";
import { useSelector } from "react-redux";
import axios from "axios";
import Applicationform from "./Pages/Applicationform";
const App = () => {
    const [role, setRole] = useState([]);
    const backendurl = useSelector((state) => state.state.backendurl);
    const fetchRole = useCallback(async () => {
        // axios.get(`${backendurl}/security/role`,{
        //     headers:{
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICJNWGdyQVRpREhxQWcrWnpDRi9vam9vLzM2cVhxN29mUnE3V1BQVUF6bXpVPSJ9.eyJqdGkiOiJlMTdlMjU4NTA4YzQ0NTFjOWQ1NmRlMGUxOWUzNWI2YyIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX1VTRVIiXX0sImdpdmVuX25hbWUiOiJBa2hpbCIsImZhbWlseV9uYW1lIjoiUCBTYWppIiwic3ViIjoiZjI5ZTFkZGUtNzhkYi00NDA4LTk2NDktODA5MjdmNzhmZTg5Iiwic2NvcGUiOlsib3BlbmlkIiwidWFhLnVzZXIiXSwiY2xpZW50X2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJjaWQiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsImF6cCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwicmV2b2NhYmxlIjp0cnVlLCJncmFudF90eXBlIjoidXNlcl90b2tlbiIsInVzZXJfaWQiOiJmMjllMWRkZS03OGRiLTQ0MDgtOTY0OS04MDkyN2Y3OGZlODkiLCJvcmlnaW4iOiJzYXAuZGVmYXVsdCIsInVzZXJfbmFtZSI6ImFraGlsLnNhamlAaW5jdHVyZS5jb20iLCJlbWFpbCI6ImFraGlsLnNhamlAaW5jdHVyZS5jb20iLCJhdXRoX3RpbWUiOjE3MDkwMTM5NDUsInJldl9zaWciOiIyZmQ2MjM0ZSIsImlhdCI6MTcwOTAxMzk0NSwiZXhwIjoxNzA5MTAwMzQ1LCJpc3MiOiJodHRwczovL2QzNzdkNjA2dHJpYWwuYXV0aGVudGljYXRpb24udXMxMC5oYW5hLm9uZGVtYW5kLmNvbS9vYXV0aC90b2tlbiIsInppZCI6Ijk4MGI3OTM0LTVjZTMtNGY2OS05OWJiLTFkODc4NWVlZDEwYiIsImF1ZCI6W119.fLxe9p3SPT4J8Nn1-xufIM15SgEK_9EDbleYXRg-SiZzFGC2yS7UYZUaULeKrb8VPx2jCalN9RLdru0m-hNSlRQyEDKFSK-xpuJ-fuBixtSBcr-bXrrekVKFyiw9I_PYUbKW_FeIu4ld-LOm_HrcMdWRm5VYq6BQea5C2yqSu-xwqxFcR1OW90uIT_wcOpGoDhmttJZwrfYvpM1d-kPxa51SMM9l68rdOY3m_AC28EFdH4ss3owl_v3TKegek57J5uxbUc0_h1FWafrZb1HWsJemnZMW00B_8xbgK4q-3Wjhcd66epLWhND_-noA60K-cUhWwh-PD-ElLeWXV5iu9Q"
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
            </Routes>
        </HashRouter>
    );
}
export default App;