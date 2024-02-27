const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const jwt = require('jsonwebtoken');
const axios = require('axios');
const jobRoute=require("./Routes/jobRoute");
const applicationRoute=require("./Routes/applicationRoute");
const securityRoute=require("./Routes/securityRoute");
const fileUpload=require("express-fileupload");
const app=express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
// mongoose.connect("mongodb+srv://akhilpsaji:akhilpsaji@mycluster.reur6su.mongodb.net/JOBSEEKING?retryWrites=true&w=majority");
mongoose.connect(process.env.MongoDB_URL);
async function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }
    try {
        // Extracting kid (Key ID) from the token header
        const header = jwt.decode(token.split(" ")[1], { complete: true }).header;
        const kid = header.kid;
        const jku=header.jku;
        // Fetching the JWK Set from jku endpoint
        const jwks = await axios.get(jku);

        // Find the matching key in JWK Set using the kid
        const key = jwks.data.keys.find(key => key.kid === kid);
        if (!key) {
            return res.status(401).json({ message: 'Unable to find matching key for token verification' });
        }
        const pem = key.value;
        // Verify the token using the fetched key
        jwt.verify(token.split(" ")[1], pem, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token is not valid' });
            }
            next();
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
app.use(verifyToken);
app.use(fileUpload());
app.use("/jobs",jobRoute);
app.use("/application",applicationRoute);
app.use("/security",securityRoute);
app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
})