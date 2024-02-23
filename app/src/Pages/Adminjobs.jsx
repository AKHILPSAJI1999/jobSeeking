import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Backdrop, Button, CircularProgress, Divider, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const vertical = 'top';
const horizontal = 'center';
const Adminjobs = () => {
    const [jobs, setJobs] = useState();
    const [initialJobs, setInitialJobs] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [textFieldState, setTextFieldState] = useState({});
    const [errorMessage, setErrorMessage] = useState("Something went Wrong");
    const [textDeleteFieldState, setTextDeleteFieldState] = useState({});
    const backendurl = useSelector((state) => state.state.backendurl);
    const fetchAdminJobs = useCallback(async () => {
        // await axios.get(`${backendurl}/jobs/email`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICJpOWZINjdlT2ljWWJ4bzFQQVV1VFRyd1lMUjRZOHVZcDBZd3hkTTdTWjA4PSJ9.eyJqdGkiOiI5ZTQ2NGE0Yjc5YjI0ODBhOTZhZTlmZGYwOGYzNGIzMSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwODY3ODk1MiwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA4Njc4OTUyLCJleHAiOjE3MDg3NjUzNTIsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.owgd5fsMgTjqYH3fsIyeCZEBxYGddJ_hkeLEy8GstXzkVji9O5UIZwoFBCHmwTsL4eLsHm5c6lMVbsNcDP7ZQZBolGy_K9MvyKTxg4FRErsQGNi7fsGycDlXsO2eOVL4tfeYMb59O-OcBxUQvOUQlN4AYx582fvnardj_FrciYBVhWJ8LCJSx1aYq_jR2x8bJuhRaGkOjSg-R2v9HD89abdM8kFY1qu6jCjyzoLAJrAndrEt5j0rxFLp-P4VUDgiadpMekkjMtlJE1eMIQB_vxTfHoPgTbFhADiuqI2QnZRhAg51kO7dhxXXme0RNMAJM1RPPP64Z6YDgJJ6HrGICA"
        //     }
        // }).then((res) => { setJobs(res.data.data); setInitialJobs(res.data.data); setTextFieldState(Array(res.data.data.length).fill(true)); setTextDeleteFieldState(Array(res.data.data.length).fill(true)); }).catch((e) => { console.log(e); setError(true); });
        await axios.get(`${backendurl}/jobs/email`).then((res) => { setJobs(res.data.data); setInitialJobs(res.data.data); setTextFieldState(Array(res.data.data.length).fill(true)); setTextDeleteFieldState(Array(res.data.data.length).fill(true)); }).catch((e) => { console.log(e); setError(true); });
    }, [backendurl]);
    useEffect(() => {
        fetchAdminJobs();
    }, [fetchAdminJobs]);
    const handleChange = (value, index, field) => {
        const updatedJobs = [...jobs];
        updatedJobs[index] = { ...updatedJobs[index], [field]: value };
        setJobs(updatedJobs);
    }
    const handleEditClick = (ind) => {
        const updatedTextFieldState = [...textFieldState];
        updatedTextFieldState[ind] = !updatedTextFieldState[ind];
        setJobs(initialJobs);
        setTextFieldState(updatedTextFieldState);
    }
    const handleDeleteClick = (ind) => {
        const updatedTextFieldState = [...textDeleteFieldState];
        updatedTextFieldState[ind] = !updatedTextFieldState[ind];
        setTextDeleteFieldState(updatedTextFieldState);
    }
    const handleEditSubmit = async (ind) => {
        setLoading(true);
        // await axios.put(`${backendurl}/jobs/${jobs[ind]._id}`, jobs[ind], {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICJpOWZINjdlT2ljWWJ4bzFQQVV1VFRyd1lMUjRZOHVZcDBZd3hkTTdTWjA4PSJ9.eyJqdGkiOiI5ZTQ2NGE0Yjc5YjI0ODBhOTZhZTlmZGYwOGYzNGIzMSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwODY3ODk1MiwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA4Njc4OTUyLCJleHAiOjE3MDg3NjUzNTIsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.owgd5fsMgTjqYH3fsIyeCZEBxYGddJ_hkeLEy8GstXzkVji9O5UIZwoFBCHmwTsL4eLsHm5c6lMVbsNcDP7ZQZBolGy_K9MvyKTxg4FRErsQGNi7fsGycDlXsO2eOVL4tfeYMb59O-OcBxUQvOUQlN4AYx582fvnardj_FrciYBVhWJ8LCJSx1aYq_jR2x8bJuhRaGkOjSg-R2v9HD89abdM8kFY1qu6jCjyzoLAJrAndrEt5j0rxFLp-P4VUDgiadpMekkjMtlJE1eMIQB_vxTfHoPgTbFhADiuqI2QnZRhAg51kO7dhxXXme0RNMAJM1RPPP64Z6YDgJJ6HrGICA"
        //     }
        // }).then((res) => { setLoading(false); fetchAdminJobs(); setEditSuccess(true); }).catch((e) => { console.log(e); (e.response === undefined) ? setErrorMessage("Something went Wrong") : setErrorMessage(e.response.data.message); setError(true); setLoading(false); handleEditClick(ind); });
        await axios.put(`${backendurl}/jobs/${jobs[ind]._id}`, jobs[ind]).then((res) => { setLoading(false); fetchAdminJobs(); setEditSuccess(true); }).catch((e) => { console.log(e); (e.response === undefined) ? setErrorMessage("Something went Wrong") : setErrorMessage(e.response.data.message); setError(true); setLoading(false); handleEditClick(ind); });
    }
    const handleDeleteSubmit = async (ind) => {
        setLoading(true);
        // await axios.delete(`${backendurl}/jobs/${jobs[ind]._id}`, {
        //     headers: {
        //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICJpOWZINjdlT2ljWWJ4bzFQQVV1VFRyd1lMUjRZOHVZcDBZd3hkTTdTWjA4PSJ9.eyJqdGkiOiI5ZTQ2NGE0Yjc5YjI0ODBhOTZhZTlmZGYwOGYzNGIzMSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwODY3ODk1MiwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA4Njc4OTUyLCJleHAiOjE3MDg3NjUzNTIsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.owgd5fsMgTjqYH3fsIyeCZEBxYGddJ_hkeLEy8GstXzkVji9O5UIZwoFBCHmwTsL4eLsHm5c6lMVbsNcDP7ZQZBolGy_K9MvyKTxg4FRErsQGNi7fsGycDlXsO2eOVL4tfeYMb59O-OcBxUQvOUQlN4AYx582fvnardj_FrciYBVhWJ8LCJSx1aYq_jR2x8bJuhRaGkOjSg-R2v9HD89abdM8kFY1qu6jCjyzoLAJrAndrEt5j0rxFLp-P4VUDgiadpMekkjMtlJE1eMIQB_vxTfHoPgTbFhADiuqI2QnZRhAg51kO7dhxXXme0RNMAJM1RPPP64Z6YDgJJ6HrGICA"
        //     }
        // }).then((res) => { setLoading(false); fetchAdminJobs(); setDeleteSuccess(true); }).catch((e) => { console.log(e); (e.response === undefined) ? setErrorMessage("Something went Wrong") : setErrorMessage(e.response.data.message); setError(true); setLoading(false); handleDeleteClick(ind); });
        await axios.delete(`${backendurl}/jobs/${jobs[ind]._id}`).then((res) => { setLoading(false); fetchAdminJobs(); setDeleteSuccess(true); }).catch((e) => { console.log(e); (e.response === undefined) ? setErrorMessage("Something went Wrong") : setErrorMessage(e.response.data.message); setError(true); setLoading(false); handleDeleteClick(ind); });
    }
    const handleErrorClose = () => {
        setError(false);
        setErrorMessage("Something went Wrong");
    }
    const handleDeleteSuccessClose = () => {
        setDeleteSuccess(false);
    }
    const handleEditSuccessClose = () => {
        setEditSuccess(false);
    }
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
    else {
        return (
            <>
                <Navbar buttonNames={['HOME', 'POST A NEW JOB', 'APPLICANTS APPLICATIONS']} navigate={['/home', '/createJob', '/applicants']} />
                <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"} sx={{ mt: 2 }}>YOUR POSTED JOBS</Typography>
                <Divider />
                {
                    jobs.map((ele, ind) => {
                        return (
                            <Accordion key={ele._id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    {ele.title}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid item md={1} sm={0.5}>

                                        </Grid>
                                        <Grid item md={2} sm={2.5} xs={3}>
                                            <Typography sx={{ mt: 1, mb: 1 }} fontWeight={"bolder"}>Title:</Typography>
                                            <TextField multiline disabled={textFieldState[ind]} sx={{ mt: 1, mb: 1 }} value={ele.title} onChange={(e) => handleChange(e.target.value, ind, 'title')} fullWidth id="standard-basic" variant="standard" placeholder="Enter Job Title" />
                                            <Typography sx={{ mt: 1, mb: 1 }} fontWeight={"bolder"}>Country:</Typography>
                                            <TextField multiline disabled={textFieldState[ind]} sx={{ mt: 1, mb: 1 }} value={ele.country} onChange={(e) => handleChange(e.target.value, ind, 'country')} fullWidth id="standard-basic" variant="standard" placeholder="Enter Country" />
                                            <Typography sx={{ mt: 1, mb: 1 }} fontWeight={"bolder"}>City:</Typography>
                                            <TextField multiline disabled={textFieldState[ind]} sx={{ mt: 1, mb: 1 }} value={ele.city} onChange={(e) => handleChange(e.target.value, ind, 'city')} fullWidth id="standard-basic" variant="standard" placeholder="Enter City" />
                                            <Typography sx={{ mt: 1, mb: 1 }} fontWeight={"bolder"}>Category:</Typography>
                                            <TextField multiline disabled={textFieldState[ind]} sx={{ mt: 1, mb: 1 }} value={ele.category} onChange={(e) => handleChange(e.target.value, ind, 'category')} fullWidth id="standard-basic" variant="standard" placeholder="Enter Category" />
                                            <Typography sx={{ mt: 1, mb: 1 }} fontWeight={"bolder"}>Salary:</Typography>
                                            <TextField multiline disabled={textFieldState[ind]} sx={{ mt: 1, mb: 1 }} value={ele.salary} onChange={(e) => handleChange(e.target.value, ind, 'salary')} fullWidth id="standard-basic" type="number" variant="standard" placeholder="Enter Salary" />
                                        </Grid>
                                        <Grid item md={1} sm={0.5} xs={0.5}>

                                        </Grid>
                                        <Grid item md={4} sm={4.5} xs={4.5}>
                                            <Typography sx={{ mt: 1, mb: 1 }} fontWeight={"bolder"}>Description:</Typography>
                                            <TextField disabled={textFieldState[ind]}
                                                value={ele.description} onChange={(e) => handleChange(e.target.value, ind, 'description')}
                                                fullWidth
                                                placeholder="Enter Description"
                                                multiline
                                                sx={{ mt: 1, mb: 1 }}
                                                variant="standard"
                                            />
                                            <Typography sx={{ mt: 1, mb: 1 }} fontWeight={"bolder"}>Location:</Typography>
                                            <TextField multiline disabled={textFieldState[ind]} sx={{ mt: 1, mb: 1 }} value={ele.location} onChange={(e) => handleChange(e.target.value, ind, 'location')} fullWidth id="standard-basic" variant="standard" placeholder="Enter Location" />
                                        </Grid>
                                        <Grid item md={3} sm={3.5} xs={4} textAlign={"center"}>
                                            <Grid container alignItems="center">
                                                <Grid item md={12} sm={12} xs={12} sx={{ mt: 1, mb: 1 }} textAlign="center">
                                                    {
                                                        (textFieldState[ind]) ? <Button variant="contained" color="warning" onClick={() => handleEditClick(ind)}>EDIT</Button>
                                                            : <><IconButton onClick={() => handleEditSubmit(ind)}><DoneIcon style={{ color: "green" }} /></IconButton><IconButton onClick={() => handleEditClick(ind)}><ClearRoundedIcon style={{ color: "red" }} /></IconButton></>
                                                    }
                                                </Grid>
                                                <Grid item md={12} sm={12} xs={12} sx={{ mt: 1, mb: 1 }} textAlign="center">
                                                    {
                                                        (textDeleteFieldState[ind]) ? <Button variant="contained" color="error" onClick={() => handleDeleteClick(ind)}>DELETE</Button>
                                                            : <><IconButton onClick={() => handleDeleteSubmit(ind)}><DoneIcon style={{ color: "green" }} /></IconButton><IconButton onClick={() => handleDeleteClick(ind)}><ClearRoundedIcon style={{ color: "red" }} /></IconButton></>
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={1} sm={0.5}>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion >
                        );
                    })
                }
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar open={error} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleErrorClose}>
                    <Alert
                        onClose={handleErrorClose}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={editSuccess} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleEditSuccessClose}>
                    <Alert
                        onClose={handleEditSuccessClose}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        Successfully Updated the job Details
                    </Alert>
                </Snackbar>
                <Snackbar open={deleteSuccess} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleDeleteSuccessClose}>
                    <Alert
                        onClose={handleDeleteSuccessClose}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        Successfully Deleted the Job
                    </Alert>
                </Snackbar>
            </>
        );
    }
}
export default Adminjobs;