
const router = require("express").Router();
const equipeController = require("../controllers/equipeController");
const file = require("../middleware/file");


router.post("/saveEquipe",file.upload.single('avatar'), equipeController.saveEquipe);
router.get("/findEquipes", equipeController.findAll);

router.put("/updateEquipes/:id", equipeController.updateEquipe);
router.delete("/deleteEquipes/:id", equipeController.deleteEquipe);
router.get("/getEquipes/:id", equipeController.getEquipe);

module.exports = router;
