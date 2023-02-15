const express = require('express');
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/adduser", (req, res) => {
    console.log(req.body);
    res.send("Response reseived: " + req.body);
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});