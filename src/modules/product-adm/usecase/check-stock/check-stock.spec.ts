import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 100,
    stock: 10,
});


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe("Stock Product usecase unit test", () => {
    it("should find a product stock", async () => {
        const productRepository = MockRepository();
        const usecase = new CheckStockUseCase(productRepository);

        const result = await usecase.execute({
            productId: product.id.id,
        });

        expect(result.productId).toBe(product.id.id);
        expect(result.stock).toBe(product.stock);
    });
});