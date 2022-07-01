const { body, param } = require("express-validator");
const { loginRequired } = require("../middlewares/authMiddlewares");
const { formChacker } = require("../middlewares/formMiddleware");
const {
    isOfferExist,
    isUserOffer,
} = require("../middlewares/offerMiddlewares");
const {
    isExist,
    isNotUserProduct,
} = require("../middlewares/productMiddlewares");
const router = require("express").Router();
const offer = require("./controllers");

router.post(
    "/create/:id",
    loginRequired,
    body("offerPrice").notEmpty(),
    param("id").notEmpty(),
    formChacker,
    isExist,
    isNotUserProduct,
    offer.create
);
router.get("/u/lists", loginRequired, offer.userOffers);
router.delete(
    "/u/delete/:id",
    loginRequired,
    isOfferExist,
    isUserOffer,
    offer.deletOffers
);

module.exports = router;
