import { Alert, Backdrop, Button, CircularProgress, Divider, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const vertical = 'top';
const horizontal = 'center';
const Applicationform = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [about, setAbout] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something went Wrong");
    const [requiredAlert, setRequiredAlert] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState(null);
    const [loader, setLoader] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const backendurl = useSelector((state) => state.state.backendurl);
    const { jobId } = useParams();
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
    };
    const handleSavedSuccessClose = () => {
        setSavedSuccess(false);
        navigate("/home");
    }
    const handleErrorClose = () => {
        setError(false);
        setErrorMessage("Something went Wrong");
    }
    const handleApplicationUpload = async () => {
        if (name === '' || phoneNumber === 0 || address === '' || about === '' || file === null) {
            setRequiredAlert(true);
        }
        else {
            setLoader(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", name);
            formData.append("phoneNumber", phoneNumber);
            formData.append("address", address);
            formData.append("about", about);
            formData.append("jobId", jobId);
            // await axios.post(`${backendurl}/application`, formData, {
            //     headers: {
            //         Authorization: "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktYjNmM2Y3N2FlNiIsInR5cCI6IkpXVCIsImppZCI6ICI1SUFnRFMwN09LemdTNENxVzFTRHBaM3NRcVorSEpjK0x4azdITkNHRTRnPSJ9.eyJqdGkiOiI4NjA2NTc2OWYxMmU0OTkxODcxMDk4NWRjNWZjYjZjYSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI5ODBiNzkzNC01Y2UzLTRmNjktOTliYi0xZDg3ODVlZWQxMGIiLCJ6ZG4iOiJkMzc3ZDYwNnRyaWFsIn0sInhzLnVzZXIuYXR0cmlidXRlcyI6e30sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnJvbGVjb2xsZWN0aW9ucyI6WyJKT0JTRUVLSU5HX0FETUlOIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiQWtoaWwiLCJmYW1pbHlfbmFtZSI6IlAgU2FqaSIsInN1YiI6IjAxYTVjYWM3LTkyYTEtNGE5Ni1iNWVhLTVkNTcxMThiM2Q1MSIsInNjb3BlIjpbIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6InNiLWpvYi14c3VhYSF0MjQ0NzUyIiwiY2lkIjoic2Itam9iLXhzdWFhIXQyNDQ3NTIiLCJhenAiOiJzYi1qb2IteHN1YWEhdDI0NDc1MiIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InVzZXJfdG9rZW4iLCJ1c2VyX2lkIjoiMDFhNWNhYzctOTJhMS00YTk2LWI1ZWEtNWQ1NzExOGIzZDUxIiwib3JpZ2luIjoic2FwLmRlZmF1bHQiLCJ1c2VyX25hbWUiOiJha2hpbHBzYWppMTk5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFraGlscHNhamkxOTk5QGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTcwOTAxMzkwMCwicmV2X3NpZyI6IjFmMTJhZTc0IiwiaWF0IjoxNzA5MDEzOTAxLCJleHAiOjE3MDkxMDAzMDEsImlzcyI6Imh0dHBzOi8vZDM3N2Q2MDZ0cmlhbC5hdXRoZW50aWNhdGlvbi51czEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiOTgwYjc5MzQtNWNlMy00ZjY5LTk5YmItMWQ4Nzg1ZWVkMTBiIiwiYXVkIjpbXX0.JqjoqK5C5HQ4kk0m46jkYzm5TZ-hMQiyjkdGglX-GR7C12xuuD-I8xsyoV7KC8tr91EzNrU7YaljE1CX8Kv7WSgKAYfld2n8i9nSklG_PsEhNVZNc79Qt1ChtsLgPWBtJtktJNhv7exNEA386BaQ4XhwxWEkLGnfTFVJW-HwWxGHEjqKeCCF-WdezMpEKDYFFIYygrO25M01bbazlPwOWZmlGSC5S5nSh2TJXyw1ZsfcVimEz0WcUmyzhkP5rwcAFyFhIL6re-BIXn9d62Ctt0ydRNOgZcocqqhmoPFCP1_pk3RqHPeIOgpm5doPTWT8AQYBwGVUeTd1NbqmA2C1fw"
            //     }
            // }).then((res) => { setLoader(false); setSavedSuccess(true); }).catch((e) => { console.log(e); (e.response === undefined) ? setErrorMessage("Something went Wrong") : setErrorMessage(e.response.data.message); setError(true); setLoader(false); });
            await axios.post(`${backendurl}/application`, formData).then((res) => { setLoader(false); setSavedSuccess(true); }).catch((e) => { console.log(e); (e.response === undefined) ? setErrorMessage("Something went Wrong") : setErrorMessage(e.response.data.message); setError(true); setLoader(false); });
        }
    }
    const handleRequiredAlertClose = () => {
        setRequiredAlert(false);
    }
    if (props.role.includes('JOBSEEKING_USER')) {
        return (
            <>
                <Navbar buttonNames={['HOME', 'MY APPLICATIONS']} navigate={['/home', '/myapplications']} />
                <IconButton onClick={() => navigate(`/home/${jobId}`)}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"}>APPLICATION FORM</Typography>
                <Divider />
                <Grid container>
                    <Grid item md={3} sm={2} xs={1}>

                    </Grid>
                    <Grid item md={6} sm={8} xs={10}>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{ mt: 1, mb: 1 }} fullWidth id="standard-basic" label="Name*" variant="standard" placeholder="Enter Your Name" />
                        <TextField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} sx={{ mt: 1, mb: 1 }} fullWidth id="standard-basic" type="number" label="Phone Number*" variant="standard" placeholder="Enter Your Contact No" />
                        <TextField value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mt: 1, mb: 1 }} fullWidth id="standard-basic" label="Address*" variant="standard" placeholder="Enter Your Address" />
                        <TextField value={about} onChange={(e) => setAbout(e.target.value)} multiline sx={{ mt: 1, mb: 1 }} fullWidth id="standard-basic" label="About*" variant="standard" placeholder="Write About Yourself in brief" />
                        <Typography variant="h6">Upload Resume Image</Typography>
                        <input type="file" onChange={(e) => handleFileChange(e)} />
                        {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />}
                        <Button fullWidth color="inherit" variant="contained" style={{ backgroundColor: "green" }} sx={{ mt: 2 }} onClick={handleApplicationUpload}>SEND APPLICATION</Button>
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
                <Snackbar open={savedSuccess} anchorOrigin={{ vertical, horizontal }} autoHideDuration={1000} onClose={handleSavedSuccessClose}>
                    <Alert
                        onClose={handleSavedSuccessClose}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        Successfully Submitted the Application
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
}
export default Applicationform;