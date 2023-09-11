import { ProductModel } from "../repository/product.model";
import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import StoreCatalogFacade from "./store-catalog..facade";
import ProductRepository from "../repository/product.repostory";
import FindProductUseCase from "../usecases/find-product/find-product.usecase";
import FindAllProductsUseCase from "../usecases/find-all-products/find-all-products.usecase";
import StorageCatalogFacadeFactory from "../factory/facade.factory";
import { FindProductInputDto } from "../usecases/find-product/find-product.dto";


describe("Store catalog facade test", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const storeCatalogFacade = new StoreCatalogFacade({
            findUseCase: findProductUseCase,
            findAllUseCase: undefined,
        });

        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });

        const result = await storeCatalogFacade.find({
            id: product.id.id,
        });

        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.salesPrice).toBe(product.salesPrice);
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindAllProductsUseCase(productRepository);

        const storeCatalogFacade = new StoreCatalogFacade({
            findUseCase: undefined,
            findAllUseCase: findProductUseCase,
        });

        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        const product2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 200,
        });

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });

        await ProductModel.create({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice,
        });

        const result = await storeCatalogFacade.findAll();

        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product.id.id);
        expect(result.products[0].name).toBe(product.name);
        expect(result.products[0].description).toBe(product.description);
        expect(result.products[0].salesPrice).toBe(product.salesPrice);

        expect(result.products[1].id).toBe(product2.id.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].description).toBe(product2.description);
        expect(result.products[1].salesPrice).toBe(product2.salesPrice);
    });

    it("should find a product using factory", async () => {
        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });

        const factoryFacade = StorageCatalogFacadeFactory.create();

        const inputCheckStock: FindProductInputDto = {
            id: "1"
        };

        const productFinded = await factoryFacade.find(inputCheckStock);

        expect(productFinded.id).toBe(product.id.id);
        expect(productFinded.name).toBe(product.name);
        expect(productFinded.description).toBe(product.description);
        expect(productFinded.salesPrice).toBe(product.salesPrice);
    });

    it("should find all products using factory", async () => {
        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        const product2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 200,
        });

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });

        await ProductModel.create({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice,
        });

        const factoryFacade = StorageCatalogFacadeFactory.create();

        const result = await factoryFacade.findAll();

        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product.id.id);
        expect(result.products[0].name).toBe(product.name);
        expect(result.products[0].description).toBe(product.description);
        expect(result.products[0].salesPrice).toBe(product.salesPrice);

        expect(result.products[1].id).toBe(product2.id.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].description).toBe(product2.description);
        expect(result.products[1].salesPrice).toBe(product2.salesPrice);
    });
});