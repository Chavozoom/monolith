import ProductGateway from "../../gateway/product.gateway";
import UseCasesInterface from "../../../@shared/domain/usecases/use-case.interface";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCasesInterface {
    private _productRepository: ProductGateway;

    constructor(_productRepository: ProductGateway) {
        this._productRepository = _productRepository;
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {

        const product = await this._productRepository.find(input.id);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        };
    }
}