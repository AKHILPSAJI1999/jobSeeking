const express=require("express");
const mongoose=require("mongoose");
const jobRoute=require("./Routes/jobRoute");
const app=express();
const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb+srv://akhilpsaji:akhilpsaji@mycluster.reur6su.mongodb.net/JOBSEEKING?retryWrites=true&w=majority");
app.use("/jobs",jobRoute);
app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
})