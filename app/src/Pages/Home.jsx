import React from "react";
import Navbar from "../Components/Navbar";
import { Divider, Typography } from "@mui/material";
const Home = () => {
    return (
        <>
            <Navbar buttonNames={['VIEW YOUR JOBS', 'POST A NEW JOB', 'APPLICANTS']} navigate={['/viewJobs', '/createJob', '/applicants']} />
            <Typography variant="h3" fontFamily={"fantasy"} textAlign={"center"} sx={{ mt: 10 }}>ALL JOBS</Typography>
            <Divider />
        </>
    );
};
export default Home;