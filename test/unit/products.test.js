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

// Mock 함수를 사용한 모델 생성 및 스파이 역할
productModel.create = jest.fn();

// * Create Function이 있는지 테스트
describe("Product Controller Create", () => {
    // 테스트에 대한 설명
    it("should have a createProduct function", () => {
        expect(typeof productController.createProduct).toBe("function");
    });
    // Product를 DB에 넣기
    it("should call ProductModel.create", () => {
        productController.createProduct();
        expect(productModel.create).toBeCalled();
    });
});