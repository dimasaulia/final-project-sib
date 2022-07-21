if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const ROUTER = require("./router");
const app = express();
const expbs = require("express-handlebars");
const cors = require("cors");

app.engine("html", expbs.engine(expbs.create({ extname: ".html" })));
app.set("views", "views");
app.set("view engine", "html");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://127.0.0.1:3000",
    })
);
app.use("/api", ROUTER);
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("ITS WORK");
});

app.get("/doc", (req, res) => {
    res.render("docs", { layout: false });
});

app.listen(PORT, () => {
    console.log(`🤘 SERVER RUNNING IN PORT ${PORT}`);
});
