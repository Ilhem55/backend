const router = require("express").Router();
const authController = require("../controllers/authController");
const file = require("../middleware/file");

router.post("/signup", file.upload.single('avatar'), authController.signup);
router.post("/signin", authController.signIn);

module.exports = router;