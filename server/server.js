const express = require('express');
const cors = require('cors');
const pool = require("./database");
const app = express();

//middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/adduser', (req, res) => {
    const id = req.body["id"];
    const name = req.body["name"];
    const password = req.body["password"];
    const email = req.body["email"];

    console.log("ID: " + id);
    console.log("Username: " + name);
    console.log("Password: " + password);
    console.log("Email: " + email);

    const insertSTMT = `INSERT INTO users (id, name, password, email) VALUES ('${id}', '${name}' , '${password}', '${email}');`

    pool.query(insertSTMT).then((response) => {
        console.log("Data saved")
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })

    console.log(req.body)
    res.send("Response reseived: " + req.body);
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});