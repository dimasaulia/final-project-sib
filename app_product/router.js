const { body } = require("express-validator");
const { formChacker } = require("../middlewares/formMiddleware");
const router = require("express").Router();
const product = require("./controllers");
const authMiddleware = require("../middlewares/authMiddlewares");
const productMiddleware = require("../middlewares/productMiddlewares");

router.post(
    "/create",
    authMiddleware.loginRequired,
    body("name").notEmpty(),
    body("description").notEmpty(),
    body("porductPhoto").notEmpty(),
    body("minimumPrice").notEmpty(),
    body("categoryName").notEmpty(),
    formChacker,
    product.create
);

router.get("/list/all", authMiddleware.loginRequired, product.allProducts);
router.get(
    "/list/:username",
    authMiddleware.loginRequired,
    product.userProducts
);
router.get(
    "/u/list/all",
    authMiddleware.loginRequired,
    product.userAllProducts
);
router.get(
    "/list/available",
    authMiddleware.loginRequired,
    product.availableProducts
);
router.get("/detail/:id", authMiddleware.loginRequired, product.detail);
router.post("/search", authMiddleware.loginRequired, product.search);
router.delete(
    "/delete/:id",
    authMiddleware.loginRequired,
    productMiddleware.isExist,
    productMiddleware.isUserProduct,
    product.deleteOne
);
router.patch(
    "/update/:id",
    body("name").notEmpty(),
    body("description").notEmpty(),
    body("porductPhoto").notEmpty(),
    body("minimumPrice").notEmpty(),
    body("categoryName").notEmpty(),
    formChacker,
    authMiddleware.loginRequired,
    productMiddleware.isExist,
    productMiddleware.isUserProduct,
    product.update
);

module.exports = router;
