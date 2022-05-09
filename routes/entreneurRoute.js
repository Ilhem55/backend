const router = require("express").Router();
const entreneurController = require("../controllers/entreneurController");
const file = require("../middleware/file");
const authorize = require("../_helpers/authorize");
const Role = require("../_helpers/role");
router.post("/saveEntreneur",file.upload.single('avatar'), entreneurController.saveEntreneur);
//router.get("/findEntreneur", entreneurController.findOne);
router.get("/findEntreneurs", authorize(Role.Admin,Role.Joueur), entreneurController.findAll);
router.put("/updateEntreneurs/:id", entreneurController.updateEntreneur);
router.delete("/deleteEntreneurs/:id", entreneurController.deleteEntreneur);
router.get("/getEntreneurs/:id", entreneurController.getEntreneur);

module.exports = router;
