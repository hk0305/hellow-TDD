const express = require('express');
const router = express.Router();
const productController = require("../controller/products")

// productController는 middleware
// middleware 함수를 url에 맵핑해준다.
router.get('/', productController.hello );

module.exports = router;