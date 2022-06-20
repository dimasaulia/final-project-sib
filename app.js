require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("ITS WORK");
});

app.listen(PORT, () => {
    console.log(`🤘 SERVER RUNNING IN PORT ${PORT}`);
});
