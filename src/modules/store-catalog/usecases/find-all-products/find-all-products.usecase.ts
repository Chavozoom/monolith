import FindAllProductsDto from "./find-all-products.dto";
import ProductGateway from "../../gateway/product.gateway";
import UseCasesInterface from "../../../@shared/domain/usecases/use-case.interface";

export default class FindAllProductsUseCase implements UseCasesInterface {
    private _productRepository: ProductGateway;

    constructor(_productRepository: ProductGateway) {
        this._productRepository = _productRepository;
    }

    async execute(): Promise<FindAllProductsDto> {

        const product = await this._productRepository.findAll();

        const products: FindAllProductsDto = {
            products: product.map((product) => {
                return {
                    id: product.id.id,
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice
                };
            })
        };

        return products;
    }
}