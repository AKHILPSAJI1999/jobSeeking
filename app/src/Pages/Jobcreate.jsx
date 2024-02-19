import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Alert, Backdrop, Button, CircularProgress, Divider, Grid, Snackbar, TextField, Typography } from "@mui/material";
const vertical = 'top';
const horizontal = 'center';
const Jobcreate = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState(0);
    const [requiredAlert, setRequiredAlert] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);
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
            await axios.post(`${backendurl}/jobs`, payload).then((res) => { setLoader(false); setSavedSuccess(true); setTitle(""); setCategory(""); setCountry(""); setCity(""); setLocation(""); setDescription(""); setSalary(0); }).catch((e) => { console.log(e); setError(true); setLoader(false);});
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
    }
    return (
        <>
            <Navbar buttonNames={['HOME', 'VIEW YOUR JOBS', 'APPLICANTS']} navigate={['/home', '/viewJobs', '/applicants']} />
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
                    Something went Wrong
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
};
export default Jobcreate;