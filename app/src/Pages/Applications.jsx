import { Alert, Backdrop, Button, CircularProgress, Divider, Grid, Snackbar, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
const vertical = 'top';
const horizontal = 'center';
const Applications = (props) => {
    const [application, setApplication] = useState();
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const backendurl = useSelector((state) => state.state.backendurl);
    const fetchApplications = useCallback(async () => {
        // await axios.get(`${backendurl}/application`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
        //     }
        // }).then((res) => { setApplication(res.data.data) }).catch((e) => { console.log(e); setError(true); });
        await axios.get(`${backendurl}/application`).then((res) => { setApplication(res.data.data) }).catch((e) => { console.log(e); setError(true); });
    }, [backendurl]);
    const fetchApplicationsByJob = useCallback(async () => {
        // await axios.get(`${backendurl}/application/byJob`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
        //     }
        // }).then((res) => { setApplication(res.data.data) }).catch((e) => { console.log(e); setError(true); });
        await axios.get(`${backendurl}/application/byJob`).then((res) => { setApplication(res.data.data) }).catch((e) => { console.log(e); setError(true); });
    }, [backendurl]);
    useEffect(() => {
        if (props.role.includes('JOBSEEKING_ADMIN')) {
            fetchApplicationsByJob();
        }
        else if (props.role.includes('JOBSEEKING_USER')) {
            fetchApplications();
        }
    }, [fetchApplications, fetchApplicationsByJob, props.role]);
    const handleApprove = async (id) => {
        setLoader(true);
        // await axios.get(`${backendurl}/application/approve?appId=${id}`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
        //     }
        // }).then((res) => { setLoader(false); fetchApplications(); }).catch((e) => { setLoader(false); });
        await axios.get(`${backendurl}/application/approve?appId=${id}`).then((res) => { setLoader(false); fetchApplications(); }).catch((e) => { setLoader(false); });
    }
    const handleReject = async (id) => {
        setLoader(true);
        // await axios.get(`${backendurl}/application/reject?appId=${id}`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
        //     }
        // }).then((res) => { setLoader(false); fetchApplications(); }).catch((e) => { setLoader(false); });
        await axios.get(`${backendurl}/application/reject?appId=${id}`).then((res) => { setLoader(false); fetchApplications(); }).catch((e) => { setLoader(false); });
    }
    const handleDelete = async (id) => {
        setLoader(true);
        // await axios.delete(`${backendurl}/application/${id}`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
        //     }
        // }).then((res) => { setLoader(false); fetchApplications(); }).catch((e) => { setLoader(false); });
        await axios.delete(`${backendurl}/application/${id}`).then((res) => { setLoader(false); fetchApplications(); }).catch((e) => { setLoader(false); });
    }
    if (props.role.includes('JOBSEEKING_ADMIN') || props.role.includes('JOBSEEKING_USER')) {
        if (application === undefined && error) {
            return (
                <>
                    <Snackbar open={true} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000}>
                        <Alert
                            severity="error"
                            sx={{ width: '100%' }}
                        >
                            SERVER DOWN PLEASE TRY AGAIN LATER
                        </Alert>
                    </Snackbar>
                </>
            );
        }
        else if (application === undefined) {
            return (
                <>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </>
            );
        }
        else {
            return (
                <>
                    <Navbar buttonNames={['HOME']} navigate={['/home']} />
                    <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"} sx={{ mt: 5 }}>MY APPLICATIONS</Typography>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <Grid container>
                        {
                            application.map((ele) => {
                                return (
                                    <React.Fragment key={ele._id}>
                                        <Grid item md={1.5}>

                                        </Grid>
                                        <Grid item md={4} sx={{ mt: 1, mb: 1 }}>
                                            <Typography variant="h6"><span style={{ fontWeight: "bolder" }}>Name:</span> {ele.name}</Typography>
                                            <Typography variant="h6"><span style={{ fontWeight: "bolder" }}>Phone Number:</span> {ele.phoneNumber}</Typography>
                                            <Typography variant="h6"><span style={{ fontWeight: "bolder" }}>Email:</span> {ele.createdBy}</Typography>
                                            <Typography variant="h6"><span style={{ fontWeight: "bolder" }}>Address:</span> {ele.address}</Typography>
                                            <Typography variant="h6"><span style={{ fontWeight: "bolder" }}>About:</span> {ele.about}</Typography>
                                        </Grid>
                                        <Grid item md={3} sx={{ mt: 1, mb: 1 }}>
                                            <img src={`data:image/jpeg;base64,${ele.imageData}`} style={{ width: "40%" }} alt="Preview" />
                                        </Grid>
                                        {
                                            (props.role.includes('JOBSEEKING_ADMIN') && ele.status === 'Pending') ? <Grid item md={2} sx={{ mt: 1, mb: 1 }}>
                                                <Grid container textAlign={"center"}>
                                                    <Grid item md={12}>
                                                        <Button variant="contained" sx={{ mt: 1, mb: 1 }} color="success" onClick={() => handleApprove(ele._id)}>Approve</Button>
                                                    </Grid>
                                                    <Grid item md={12}>
                                                        <Button variant="contained" sx={{ mt: 1, mb: 1 }} color="error" onClick={() => handleReject(ele._id)}>Reject</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid> : <Grid item md={2} sx={{ mt: 1, mb: 1 }} textAlign={"center"}>
                                                <Typography variant="h6" fontWeight={"bolder"} sx={{ mt: 1 }} textAlign={"center"}>Status</Typography>
                                                {
                                                    (ele.status === 'Pending') ? <div style={{ display: "flex", justifyContent: "center" }}><PendingActionsOutlinedIcon color="warning" sx={{ mt: 0.5 }} /><Typography variant="h6" color={"#ed6c02"}>Pending</Typography></div>
                                                        : (ele.status === 'Approved') ? <div style={{ display: "flex", justifyContent: "center" }}><CheckOutlinedIcon color="success" sx={{ mt: 0.5 }} /><Typography variant="h6" color={"#2e7d32"}>Approved</Typography></div>
                                                            : <div style={{ display: "flex", justifyContent: "center" }}><ClearOutlinedIcon color="error" sx={{ mt: 0.5 }} /><Typography variant="h6" color={"#ed6c02"}>Rejected</Typography></div>
                                                }
                                                <Button variant="contained" sx={{ mt: 1, mb: 1 }} color="error" onClick={() => handleDelete(ele._id)}>Delete Application</Button>
                                            </Grid>
                                        }
                                        <Grid item md={1.5}>

                                        </Grid>
                                        <Grid item md={12}>
                                            <Divider sx={{ mt: 1, mb: 1 }} />
                                        </Grid>
                                    </React.Fragment>
                                );
                            })
                        }
                    </Grid>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loader}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </>
            );
        }
    }
    else {
        return (
            <>
                <Snackbar open={true} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000}>
                    <Alert
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        YOU DON'T HAVE ACCESS TO THIS APPLICATION
                    </Alert>
                </Snackbar>
            </>
        );
    }
};
export default Applications;