const { body, param } = require("express-validator");
const { loginRequired } = require("../middlewares/authMiddlewares");
const { formChacker } = require("../middlewares/formMiddleware");
const {
    isOfferExist,
    isUserOffer,
    isOfferNotExist,
    isIncomingUserOffer,
    isNotAccapted,
    isStillOffer,
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
    isOfferNotExist,
    offer.create
);
router.get("/u/lists", loginRequired, offer.userOffers);
router.get("/u/incomingOffers", loginRequired, offer.incomingOffers);
router.delete(
    "/u/delete/:id",
    loginRequired,
    isOfferExist,
    isUserOffer,
    offer.deletOffers
);
router.post(
    "/u/accepteOffer/:id",
    loginRequired,
    isOfferExist,
    isIncomingUserOffer,
    isStillOffer,
    offer.accepteOffer
);
router.post(
    "/u/rejectOffer/:id",
    loginRequired,
    isOfferExist,
    isIncomingUserOffer,
    isNotAccapted,
    offer.rejectOffer
);

module.exports = router;
