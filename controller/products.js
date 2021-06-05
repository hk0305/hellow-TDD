// Test Sample
// exports.hello = (req, res) => {
//     res.send("안녕하세요!");
// }

const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const createdProduct = await productModel.create(req.body);
        // 201 response Code와 json Data를 응답한다.
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};