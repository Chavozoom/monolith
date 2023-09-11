import StoreCatalogFacade from "../facade/store-catalog..facade";
import ProductRepository from "../repository/product.repostory";
import FindAllProductsUseCase from "../usecases/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecases/find-product/find-product.usecase";

export default class StorageCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const productRespository = new ProductRepository();
        const findUseCase = new FindProductUseCase(productRespository);
        const findAllUseCase = new FindAllProductsUseCase(productRespository);

        const facade = new StoreCatalogFacade({
            findUseCase: findUseCase,
            findAllUseCase: findAllUseCase
        });

        return facade;
    }
}