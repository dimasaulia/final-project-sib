const router = require("express").Router();
const user = require("./contrrollers");
const { body } = require("express-validator");
const middleware = require("../middlewares/authMiddlewares");
const { formChacker } = require("../middlewares/formMiddleware");

router.post(
    "/register",
    body("email").isEmail().normalizeEmail(),
    body("username").notEmpty().trim(),
    body("password").isLength({ min: "8" }),
    formChacker,
    user.register
);
router.post(
    "/login",
    body("username").notEmpty().trim(),
    body("password").isLength({ min: "8" }),
    formChacker,
    user.login
);
router.post("/change-password", middleware.loginRequired, user.changePassword);
router.post("/search", middleware.loginRequired, user.search);
router.get("/logout", user.logout);

module.exports = router;
