import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Alert, Backdrop, Button, CircularProgress, Divider, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { useSelector } from "react-redux";
const vertical = 'top';
const horizontal = 'center';
const Singlejobview = (props) => {
    const { jobId } = useParams();
    const [job, setJob] = useState();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const backendurl = useSelector((state) => state.state.backendurl);
    const fetchJob = useCallback(async () => {
        // await axios.get(`${backendurl}/jobs/${jobId}`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
        //     }
        // }).then((res) => setJob(res.data.data)).catch((e) => { console.log(e); setError(true); });
        await axios.get(`${backendurl}/jobs/${jobId}`).then((res) => setJob(res.data.data)).catch((e) => { console.log(e); setError(true); });
    }, [backendurl, jobId])
    useEffect(() => {
        fetchJob();
    }, [fetchJob]);
    if (job === undefined && error) {
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
    else if (job === undefined) {
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
    else if (props.role.includes('JOBSEEKING_ADMIN') || props.role.includes('JOBSEEKING_USER')) {
        return (
            <>
                {
                    (props.role.includes('JOBSEEKING_ADMIN')) ? <Navbar buttonNames={['VIEW YOUR JOBS', 'POST A NEW JOB', 'APPLICANTS APPLICATIONS']} navigate={['/viewJobs', '/createJob', '/applicants']} /> : <Navbar buttonNames={['HOME', 'MY APPLICATIONS']} navigate={['/home', '/myapplications']} />
                }
                <IconButton onClick={() => navigate("/home")}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"}>JOB DETAIL</Typography>
                <Divider />
                <Grid container>
                    <Grid item md={1} sm={1} xs={0.5}>

                    </Grid>
                    <Grid item md={11} sm={11} xs={11.5}>
                        <Typography variant="h5" sx={{ mt: 1, mb: 1 }} fontFamily={"initial"}><span style={{ color: "green", fontWeight: "bolder" }}>Title:</span> {job.title}</Typography>
                        <Typography variant="h5" sx={{ mt: 1, mb: 1 }} fontFamily={"initial"}><span style={{ color: "green", fontWeight: "bolder" }}>Category:</span> {job.category}</Typography>
                        <Typography variant="h5" sx={{ mt: 1, mb: 1 }} fontFamily={"initial"}><span style={{ color: "green", fontWeight: "bolder" }}>Country:</span> {job.country}</Typography>
                        <Typography variant="h5" sx={{ mt: 1, mb: 1 }} fontFamily={"initial"}><span style={{ color: "green", fontWeight: "bolder" }}>City:</span> {job.city}</Typography>
                        <Typography variant="h5" sx={{ mt: 1, mb: 1 }} fontFamily={"initial"}><span style={{ color: "green", fontWeight: "bolder" }}>Location:</span> {job.location}</Typography>
                        <Typography variant="h5" sx={{ mt: 1, mb: 1 }} fontFamily={"initial"}><span style={{ color: "green", fontWeight: "bolder" }}>Description:</span> {job.description}</Typography>
                        <Typography variant="h5" sx={{ mt: 1, mb: 1 }} fontFamily={"initial"}><span style={{ color: "green", fontWeight: "bolder" }}>Job Posted On:</span> {job.createdOn}</Typography>
                        <Typography variant="h5" sx={{ mt: 1, mb: 1 }} fontFamily={"initial"}><span style={{ color: "green", fontWeight: "bolder" }}>Salary:</span> &#8377;{job.salary}</Typography>
                    </Grid>
                    {
                        (props.role.includes('JOBSEEKING_USER')) ? <><Grid item md={1} sm={1} xs={0.5}>

                        </Grid>
                            <Grid item md={11} sm={11} xs={11.5} sx={{ mt: 2 }}>
                                <Button variant="contained" color="success" onClick={() => navigate(`/home/${jobId}/application`)}>Apply Now</Button>
                            </Grid></> : <></>
                    }
                </Grid>
            </>
        );
    }
    else {
        return (
            <>
                <Snackbar open={true} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000}>
                    <Alert
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        YOU DON'T HAVE ACCESS TO THIS PAGE
                    </Alert>
                </Snackbar>
            </>
        );
    }
}
export default Singlejobview;