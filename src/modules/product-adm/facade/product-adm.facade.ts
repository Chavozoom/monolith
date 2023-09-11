import UseCasesInterface from "../../@shared/domain/usecases/use-case.interface";
import { AddProductFacadeInputDto } from "./dto-interfaces/add-product.facede.interface.dto";
import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./dto-interfaces/check-stock.facede.interface.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUseCase: UseCasesInterface;
    private _checkStockUseCase: UseCasesInterface;

    constructor(useCaseProps: UseCasesProps) {
        this._addUseCase = useCaseProps.addUseCase;
        this._checkStockUseCase = useCaseProps.checkStockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
}

export interface UseCasesProps {
    addUseCase: UseCasesInterface;
    checkStockUseCase: UseCasesInterface;
}