// * 기본 Test Sample
// describe("Calculation", () => {
//     test('two plus two is four', () => {
//         expect(2 + 2).toBe(4);
//     });
//     test('two plus two is not five', () => {
//         expect(2 + 2).not.toBe(5);
//     });
// });

// 테스트 명령어
// npm test

// * 함수 가져오기
const productController = require('../../controller/products');
const productModel = require('../../models/Product');

// mocks-http를 이용해 https 통신하기
const httpMocks = require('node-mocks-http');

// 추가할 Json Type DATA 가져오기
const newProduct = require('../data/new-product.json');
const Product = require('../../models/Product');

// Mock 함수를 사용한 모델 생성 및 스파이 역할
// model 생성이 잘 되는지 확인
productModel.create = jest.fn();

// 테스트 전 설정
let req, res, next;
beforeEach(() => {
    // req, res 객체를 생성하여 통신하기
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

// * Create Function이 있는지 테스트
describe("Product Controller Create", () => {
    
    beforeEach(() =>{
        req.body = newProduct;
    })
    
    // 테스트에 대한 설명
    it("Should have a createProduct function", () => {
        expect(typeof productController.createProduct).toBe("function");
    });

    // Product를 DB에 넣기
    it("Should call ProductModel.create", async() => {
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });

    it("Should return 201 response Code", async() => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    // Mock 함수로 호출된 productModel은
    // "mockReturnValue"를 사용하여 값을 맵핑한다.
    // "Accepts a value that will be returned whenever the mock function is called."
    it("Should return json body in response", async() => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });

    // error handling (Promise를 사용하여 reslove(=success)가 아닌 
    // reject(=error)를 사용하여 해당 에러값에 대한 결과가 일치하는지 확인한다.
    // beforeEach에 선언한 req.body인 newProduct의 description을 삭제하면
    // 아래 결과가 Pass로 나온다.
    it("Should handle errors", async() => {
        const errorMsg = { message : "description property missing"};
        const rejectedPromise = Promise.reject(errorMsg);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMsg);
    });

});
