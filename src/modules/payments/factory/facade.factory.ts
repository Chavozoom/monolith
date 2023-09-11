import PaymentFacadeInterface from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repostory";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const paymentRepository = new TransactionRepository();
        const useCase = new ProcessPaymentUseCase(paymentRepository);
        const facade = new PaymentFacade(useCase);

        return facade;
    }
}