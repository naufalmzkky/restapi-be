const express = require("express");
const {
  createUser,
  loginUser,
  updatePassword,
} = require("../controllers/userControllers");
const { authenticate } = require("../middlewares/auth");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.post("/category", createCategory);
router.get("/category", getCategory);

router.post("/product", createProduct);
router.get("/product", getProduct);

router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

router.patch("/update", authenticate, updatePassword);

module.exports = router;
