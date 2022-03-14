const router = require("express").Router();
const riderController = require("../controllers/rider.controller");
const jwt = require("../helper/jwt");

// router.post("/create", jwt.verifyToken, riderController.postRiderUser);
router.post("/create", jwt.verifyToken, riderController.postRiderUser);
router.put("/update", jwt.verifyToken, riderController.putRiderUser);
router.delete("/delete/:uuid", jwt.verifyToken, riderController.delRider);
router.get("/list", jwt.verifyToken, riderController.getAllRider);
router.get("/info/:uuid", jwt.verifyToken, riderController.getRiderByUID);
router.put("/change-password", jwt.verifyToken, riderController.putRiderPassword);

module.exports = router;
