const router = require("express").Router();
const USER = require("./app_user/router");
router.use("/user", USER);
module.exports = router;
