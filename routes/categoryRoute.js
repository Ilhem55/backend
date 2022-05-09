
const router = require("express").Router();
const categoryController = require("../controllers/categoryController");


router.post("/saveCategory", categoryController.saveCategory);
router.get("/findCategory", categoryController.findAll);
router.put("/updateCategory/:id", categoryController.updateCategory);
router.delete("/deleteCategory/:id", categoryController.deleteCategory);
router.get("/getCategory/:id", categoryController.getCategory);

module.exports = router;
