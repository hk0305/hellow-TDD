const mongoose = require("mongoose");

// 몽구스 스키마는 문서의 구조, 기본값, 유효성 검사기 등을 정의합니다.
const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number
    }
});

// 몽구스 모델은 레코드 생성, 쿼리, 업데이트, 삭제 등을 위한 데이터베이스 인터페이스를 제공합니다.
const Product = mongoose.model("Product", productSchema);
module.exports = Product;