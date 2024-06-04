const express = require('express');
const router = express.Router();
const controller = require("../controllers/controllers");

//Routes to controller
router.get("/",controller.getGreetings )
router.get('/products', controller.getProducts);
router.get("/categories",controller.getCategories)
router.get("/category/:id",controller.getCategoryByID)
router.get("/product/:id",controller.getProductByID)
router.get("/search/:id",controller.getSearchByID)

module.exports = router;