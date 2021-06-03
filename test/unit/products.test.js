// * 기본 Test Sample
// describe("Calculation", () => {
//     test('two plus two is four', () => {
//         expect(2 + 2).toBe(4);
//     });
//     test('two plus two is not five', () => {
//         expect(2 + 2).not.toBe(5);
//     });
// });


// * 함수 가져오기
const productController = require('../../controller/products');
const productModel = require('../../models/Product');

// mocks-http를 이용해 https 통신하기
const httpMocks = require('node-mocks-http');

// 추가할 Json Type DATA 가져오기
const newProduct = require('../data/new-product.json');

// Mock 함수를 사용한 모델 생성 및 스파이 역할
productModel.create = jest.fn();

// 테스트 전 설정
let req, res, next;
beforeEach(() => {
    // req, res 객체를 생성하여 통신하기
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

// * Create Function이 있는지 테스트
describe("Product Controller Create", () => {

    beforeEach(() =>{
        req.body = newProduct;
    })
    
    // 테스트에 대한 설명
    it("should have a createProduct function", () => {
        expect(typeof productController.createProduct).toBe("function");
    });

    // Product를 DB에 넣기
    it("should call ProductModel.create", () => {
        req.body = newProduct;
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });

});