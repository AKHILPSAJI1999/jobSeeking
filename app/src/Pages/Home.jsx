import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Alert, Backdrop, Button, Card, CardActions, CardContent, CircularProgress, Divider, Grid, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const vertical = 'top';
const horizontal = 'center';
const Home = (props) => {
    const [jobs, setJobs] = useState();
    const [error, setError] = useState(false);
    const backendurl = useSelector((state) => state.state.backendurl);
    const navigate = useNavigate();
    const fetchJobs = useCallback(async () => {
        // await axios.get(`${backendurl}/jobs`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
        //     }
        // }).then((res) => { setJobs(res.data.data); }).catch((e) => { console.log(e); setError(true); });
        await axios.get(`${backendurl}/jobs`).then((res) => { setJobs(res.data.data); }).catch((e) => { console.log(e); setError(true); });
    }, [backendurl]);
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);
    if (jobs === undefined && error) {
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
    else if (jobs === undefined) {
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
                    (props.role.includes('JOBSEEKING_ADMIN')) ? <Navbar buttonNames={['VIEW YOUR JOBS', 'POST A NEW JOB', 'APPLICANTS APPLICATIONS']} navigate={['/viewJobs', '/createJob', '/myapplications']} /> : <Navbar buttonNames={['MY APPLICATIONS']} navigate={['/myapplications']} />
                }
                <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"} sx={{ mt: 10 }}>ALL JOBS</Typography>
                <Divider />
                <Grid container>
                    {
                        (jobs.length === 0) ?
                            <>
                                <Grid item md={12}>
                                    <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"} sx={{ mt: 10 }}>NO JOBS POSTED RIGHT NOW</Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"} sx={{ mt: 10 }}>TRY AGAIN LATER</Typography>
                                </Grid>
                            </>
                            :
                            jobs.map((ele) => {
                                return (
                                    <React.Fragment key={ele._id}>
                                        <Grid item md={0.5} sm={0.5} xs={0.5}>

                                        </Grid>
                                        <Grid item md={2} sm={3} xs={5} sx={{ mt: 2 }}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography variant="h5" component="div" fontFamily={"fantasy"}>
                                                        {ele.title}
                                                    </Typography>
                                                    <Typography color="text.secondary" sx={{ mt: 1, mb: 1 }} fontFamily={"fantasy"}>
                                                        {ele.category}
                                                    </Typography>
                                                    <Typography variant="body2" fontFamily={"fantasy"}>
                                                        {ele.country}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions style={{ justifyContent: "center" }}>
                                                    <Button onClick={() => navigate(`/home/${ele._id}`)} size="small" variant="contained" color="inherit" style={{ backgroundColor: "lightblue", fontFamily: "cursive", fontWeight: "bolder" }}>Job Details</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        <Grid item md={0.5} sm={0.5} xs={0.5}>

                                        </Grid>
                                    </React.Fragment>
                                );
                            })
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
                        YOU DON'T HAVE ACCESS TO THIS APPLICATION
                    </Alert>
                </Snackbar>
            </>
        );
    }
};
export default Home;