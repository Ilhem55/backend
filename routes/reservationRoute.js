const router = require("express").Router();
const reservationController = require("../controllers/reservationController");


router.post("/saveReservation",reservationController.saveReservation);
router.delete("/deleteReservation/:id",reservationController.deleteReservation);



module.exports = router;