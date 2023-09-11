import UseCasesInterface from "../../@shared/domain/usecases/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    private _paymentService: UseCasesInterface;

    constructor(paymentService: UseCasesInterface) {
        this._paymentService = paymentService;
    }

    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return await this._paymentService.execute(input);
    }
}