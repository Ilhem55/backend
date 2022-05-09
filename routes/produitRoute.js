
const router = require("express").Router();
const produitController = require("../controllers/produitController");
const file = require("../middleware/file");


router.post("/saveProduit",file.upload.single('image'), produitController.saveProduit);
router.get("/findProduit", produitController.findAll);
router.put("/updateProduit/:id", produitController.updateProduit);
router.delete("/deleteProduit/:id", produitController.deleteProduit);
router.get("/getProduit/:id", produitController.getProduit);

module.exports = router;