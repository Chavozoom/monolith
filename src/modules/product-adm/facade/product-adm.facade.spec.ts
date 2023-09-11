import { ProductModel } from "../repository/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../repository/product.repostory";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import { AddProductFacadeInputDto } from "./dto-interfaces/add-product.facede.interface.dto";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
import { CheckStockInputDto } from "../usecase/check-stock/check-stock.dto";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 100,
    stock: 10,
});


describe("ProductAdmFacade test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);

        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            checkStockUseCase: undefined
        });

        const input: AddProductFacadeInputDto = {
            id: "1",
            name: "Product",
            description: "desc",
            purchasePrice: 15,
            stock: 10
        };

        await productFacade.addProduct(input);

        const product = await productRepository.find("1");

        expect(product.id.id).toEqual(input.id);
        expect(product.name).toEqual(input.name);
        expect(product.description).toEqual(input.description);
        expect(product.purchasePrice).toEqual(input.purchasePrice);
        expect(product.stock).toEqual(input.stock);
    });

    it("should create a product using factory", async () => {
        const productRepository = new ProductRepository();
        const productFacade = ProductAdmFacadeFactory.create();

        const input: AddProductFacadeInputDto = {
            id: "1",
            name: "Product",
            description: "desc",
            purchasePrice: 15,
            stock: 10
        };

        await productFacade.addProduct(input);

        const product = await productRepository.find("1");

        expect(product.id.id).toEqual(input.id);
        expect(product.name).toEqual(input.name);
        expect(product.description).toEqual(input.description);
        expect(product.purchasePrice).toEqual(input.purchasePrice);
        expect(product.stock).toEqual(input.stock);
    });

    it("should find the stock from a product", async () => {
        const productRepository = MockRepository();

        const checkStockUseCase = new CheckStockUseCase(productRepository);

        const productFacade = new ProductAdmFacade({
            checkStockUseCase: checkStockUseCase,
            addUseCase: undefined
        });

        const productId = "1";
        const inputCheckStock: CheckStockInputDto = {
            productId
        };

        const productStock = await productFacade.checkStock(inputCheckStock);

        expect(productStock.stock).toEqual(product.stock);
        expect(productStock.productId).toEqual(productId);
    });

    it("should find the stock using factory", async () => {
        const productRepository = new ProductRepository();
        const productFacade = ProductAdmFacadeFactory.create();

        await productRepository.add(product);

        const input = {
            productId: product.id.id
        };

        const productStock = await productFacade.checkStock(input);
        expect(productStock.productId).toEqual(product.id.id);
        expect(productStock.stock).toEqual(product.stock);
    });
});