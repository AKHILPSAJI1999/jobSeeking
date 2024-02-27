import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Alert, Backdrop, Button, CircularProgress, Divider, Grid, Snackbar, TextField, Typography } from "@mui/material";
const vertical = 'top';
const horizontal = 'center';
const Jobcreate = (props) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState(0);
    const [requiredAlert, setRequiredAlert] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something went Wrong");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const backendurl = useSelector((state) => state.state.backendurl);
    const handleSubmit = async () => {
        if (title === '' || category === '' || country === '' || city === '' || location === '' || description === '' || salary === 0) {
            setRequiredAlert(true);
        }
        else {
            const payload = {
                title,
                category,
                country,
                city,
                location,
                description,
                salary
            }
            setLoader(true);
            // await axios.post(`${backendurl}/jobs`, payload, {
            //     headers: {
            //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
            //     }
            // }).then((res) => { setLoader(false); setSavedSuccess(true); setTitle(""); setCategory(""); setCountry(""); setCity(""); setLocation(""); setDescription(""); setSalary(0); }).catch((e) => { console.log(e); (e.response === undefined) ? setErrorMessage("Something went Wrong") : setErrorMessage(e.response.data.message); setError(true); setLoader(false); });
            await axios.post(`${backendurl}/jobs`, payload).then((res) => { setLoader(false); setSavedSuccess(true); setTitle(""); setCategory(""); setCountry(""); setCity(""); setLocation(""); setDescription(""); setSalary(0); }).catch((e) => { console.log(e); (e.response===undefined)?setErrorMessage("Something went Wrong"):setErrorMessage(e.response.data.message); setError(true); setLoader(false); });
        }
    }
    const handleRequiredAlertClose = () => {
        setRequiredAlert(false);
    }
    const handleSavedSuccessClose = () => {
        setSavedSuccess(false);
    }
    const handleErrorClose = () => {
        setError(false);
        setErrorMessage("Something went Wrong");
    }
    if (props.role.includes('JOBSEEKING_ADMIN')) {
        return (
            <>
                <Navbar buttonNames={['HOME', 'VIEW YOUR JOBS', 'APPLICANTS APPLICATIONS']} navigate={['/home', '/viewJobs', '/myapplications']} />
                <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"} sx={{ mt: 10 }}>POST A NEW JOB</Typography>
                <Divider />
                <Grid container>
                    <Grid item md={1} sm={1} xs={0.5}></Grid>
                    <Grid item md={4} sm={4.5} xs={5}>
                        <TextField value={title} onChange={(e) => setTitle(e.target.value)} fullWidth id="standard-basic" label="Job Title*" variant="standard" placeholder="Enter Job Title" />
                    </Grid>
                    <Grid item md={2} sm={1} xs={1}></Grid>
                    <Grid item md={4} sm={4.5} xs={5}>
                        <TextField value={category} onChange={(e) => setCategory(e.target.value)} fullWidth id="standard-basic" label="Category*" variant="standard" placeholder="Enter Category" />
                    </Grid>
                    <Grid item md={1} sm={1} xs={0.5}></Grid>
                    <Grid item md={1} sm={1} xs={0.5}></Grid>
                    <Grid item md={4} sm={4.5} xs={5}>
                        <TextField value={country} onChange={(e) => setCountry(e.target.value)} fullWidth id="standard-basic" label="Country*" variant="standard" placeholder="Enter Country" />
                    </Grid>
                    <Grid item md={2} sm={1} xs={1}></Grid>
                    <Grid item md={4} sm={4.5} xs={5}>
                        <TextField value={city} onChange={(e) => setCity(e.target.value)} fullWidth id="standard-basic" label="City*" variant="standard" placeholder="Enter City" />
                    </Grid>
                    <Grid item md={1} sm={1} xs={0.5}></Grid>
                    <Grid item md={1} sm={1} xs={0.5}></Grid>
                    <Grid item md={4} sm={4.5} xs={5}>
                        <TextField value={location} onChange={(e) => setLocation(e.target.value)} fullWidth id="standard-basic" label="Location*" variant="standard" placeholder="Enter Location" />
                    </Grid>
                    <Grid item md={2} sm={1} xs={1}></Grid>
                    <Grid item md={4} sm={4.5} xs={5}>
                        <TextField value={salary} onChange={(e) => setSalary(e.target.value)} fullWidth id="standard-basic" label="Salary*" type="number" variant="standard" placeholder="Enter Salary" />
                    </Grid>
                    <Grid item md={1} sm={1} xs={0.5}></Grid>
                    <Grid item md={1} sm={1} xs={0.5}></Grid>
                    <Grid item md={4} sm={4.5} xs={5}>
                        <TextField
                            value={description} onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            label="Job Description*"
                            placeholder="Enter Description"
                            multiline
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={7} sm={6.5} xs={6.5}></Grid>
                    <Grid item md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Divider />
                    </Grid>
                    <Grid item md={1} sm={1} xs={0.5}></Grid>
                    <Grid item md={10} sm={10} xs={11} textAlign={"center"}>
                        <Button fullWidth onClick={handleSubmit} color="inherit" variant="contained" style={{ backgroundColor: "green" }} sx={{ mt: 2 }}>CREATE JOB</Button>
                    </Grid>
                </Grid>
                <Snackbar open={requiredAlert} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleRequiredAlertClose}>
                    <Alert
                        onClose={handleRequiredAlertClose}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        Please fill all the required fields
                    </Alert>
                </Snackbar>
                <Snackbar open={error} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleErrorClose}>
                    <Alert
                        onClose={handleErrorClose}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={savedSuccess} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleSavedSuccessClose}>
                    <Alert
                        onClose={handleSavedSuccessClose}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        Successfully Saved the job Details
                    </Alert>
                </Snackbar>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loader}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
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
};
export default Jobcreate;