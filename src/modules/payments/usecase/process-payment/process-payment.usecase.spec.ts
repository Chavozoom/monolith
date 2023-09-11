import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    orderId: "12",
    amount: 100,
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    };
};

describe("Process Payment Usecase unit test", () => {
    it("Should be able to process payment and aprove", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "12",
            amount: 100,
        };

        const result = await usecase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transaction.id.id);
        expect(result.orderId).toBe(transaction.orderId);
        expect(result.amount).toBe(transaction.amount);
        expect(result.status).toBe("approved");
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });

    it("Should be able to process payment and decline", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "12",
            amount: 50,
        };

        const result = await usecase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transaction.id.id);
        expect(result.orderId).toBe(transaction.orderId);
        expect(result.amount).toBe(transaction.amount);
        expect(result.status).toBe("rejected");
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });
});