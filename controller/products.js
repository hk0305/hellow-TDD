// Test Sample
// exports.hello = (req, res) => {
//     res.send("안녕하세요!");
// }

const productModel = require('../models/Product');

exports.createProduct = (req, res, next) => {
    const createdProduct = productModel.create(req.body);
    // 201 response Code와 json Data를 응답한다.
    console.log('createdProduct', createdProduct);
    res.status(201).json(createdProduct);
};