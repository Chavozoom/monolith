
import UseCasesInterface from "../../@shared/domain/usecases/use-case.interface";
import FindAllProductsDto from "../usecases/find-all-products/find-all-products.dto";
import { FindProductInputDto, FindProductOutputDto } from "../usecases/find-product/find-product.dto";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findUseCase: UseCasesInterface;
    private _findAllUseCase: UseCasesInterface;

    constructor(useCaseProps: UseCasesProps) {
        this._findUseCase = useCaseProps.findUseCase;
        this._findAllUseCase = useCaseProps.findAllUseCase;
    }

    async find(input: FindProductInputDto): Promise<FindProductOutputDto> {
        return await this._findUseCase.execute(input);
    }

    async findAll(): Promise<FindAllProductsDto> {
        return await this._findAllUseCase.execute({});
    }
}

export interface UseCasesProps {
    findUseCase: UseCasesInterface;
    findAllUseCase: UseCasesInterface;
}