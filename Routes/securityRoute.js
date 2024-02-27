const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
router.get("/token", async (req, res) => {
    res.status(200).json({ token: req.headers.authorization });
});
router.get("/role", async (req, res) => {
    try {
        const payload = jwt.decode(req.headers.authorization.split(" ")[1], { complete: true })?.payload;
        res.status(200).json({
            statusCode: 200,
            message: "Fetched Role",
            data: payload['xs.system.attributes']['xs.rolecollections']
        })
    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            message: e.message,
            data: null
        })
    }
});
module.exports = router;