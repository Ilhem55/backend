
const router = require("express").Router();
const joueurController = require("../controllers/joueurController");
const file = require("../middleware/file");
const authorize = require("../_helpers/authorize");
const Role = require("../_helpers/role");

router.post("/saveJoueur",file.upload.single('avatar'), joueurController.saveJoueur);
router.get("/findAllJoueurs", joueurController.findAll);
router.put("/updateJoueurs/:id", joueurController.updateJoueur);
router.delete("/deleteJoueurs/:id", joueurController.deleteJoueur);
router.get("/getJoueurs/:id", joueurController.getJoueur);
router.get("/verif-email", joueurController.verifyEmail);


module.exports = router;

