const router = require("express").Router();
const user = require("./contrrollers");
const { body } = require("express-validator");

router.post(
    "/register",
    body("email").isEmail().normalizeEmail(),
    body("username").notEmpty().trim(),
    body("password").isLength({ min: "8" }),
    user.register
);
router.post(
    "/login",
    body("username").notEmpty().trim(),
    body("password").isLength({ min: "8" }),
    user.login
);
router.post("/change-password", user.changePassword);
router.get("/logout", user.logout);

module.exports = router;