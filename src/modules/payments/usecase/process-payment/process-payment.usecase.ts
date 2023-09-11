import UseCasesInterface from "../../../@shared/domain/usecases/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payments.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCasesInterface {
    private _paymentRepository: PaymentGateway;
    constructor(paymentRepository: PaymentGateway) {
        this._paymentRepository = paymentRepository;
    }
    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {

        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId,
        });

        transaction.process();

        const persistTransaction = await this._paymentRepository.save(transaction);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: transaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
        };
    }
}