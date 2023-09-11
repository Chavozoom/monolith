import UseCasesInterface from "../../@shared/domain/usecases/use-case.interface";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto } from "./interfaces/find-invoice.facade.dto";
import { GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./interfaces/generate-invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _generateInvoiceUseCase: UseCasesInterface;
    private _findInvoiceUseCase: UseCasesInterface;

    constructor(useCaseProps: UseCasesProps) {
        this._generateInvoiceUseCase = useCaseProps.generateInvoiceUseCase;
        this._findInvoiceUseCase = useCaseProps.findInvoiceUseCase;
    }

    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateInvoiceUseCase.execute(input);
    }

    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return this._findInvoiceUseCase.execute(input);
    }
}

export interface UseCasesProps {
    generateInvoiceUseCase: UseCasesInterface;
    findInvoiceUseCase: UseCasesInterface;
}