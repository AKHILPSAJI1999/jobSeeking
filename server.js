const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const jobRoute=require("./Routes/jobRoute");
const app=express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb+srv://akhilpsaji:akhilpsaji@mycluster.reur6su.mongodb.net/JOBSEEKING?retryWrites=true&w=majority");
// mongoose.connect(process.env.MongoDB_URL);
app.use("/jobs",jobRoute);
app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
})