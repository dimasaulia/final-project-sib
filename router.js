const router = require("express").Router();
const USER = require("./app_user/router");
const PRODUCT = require("./app_product/router");
const CATEGORY = require("./app_category/router");

router.use("/user", USER);
router.use("/product", PRODUCT);
router.use("/category", CATEGORY);

module.exports = router;
