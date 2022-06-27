const router = require("express").Router();
const category = require("./categoryControllers");
const { loginRequired } = require("../middlewares/authMiddlewares");
const { formChacker } = require("../middlewares/formMiddleware");
const {
    categoryIsNotExist,
    categoryIsExist,
} = require("../middlewares/categoryMiddlewares");
const { body, param, query } = require("express-validator");

router.get("/lists", loginRequired, category.list);
router.delete(
    "/delete/:categoryName",
    loginRequired,
    param("categoryName").notEmpty(),
    formChacker,
    categoryIsExist,
    category.delete
);
router.post(
    "/create",
    loginRequired,
    body("categoryName").notEmpty(),
    formChacker,
    categoryIsNotExist,
    category.create
);
router.get(
    "/product/:categoryName",
    loginRequired,
    param("categoryName"),
    formChacker,
    categoryIsExist,
    category.productBaseOnCategory
);

module.exports = router;
