require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const ROUTER = require("./router");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", ROUTER);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("ITS WORK");
});

app.listen(PORT, () => {
    console.log(`🤘 SERVER RUNNING IN PORT ${PORT}`);
});
