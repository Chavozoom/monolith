import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import { TransactionModel } from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repostory";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import { Sequelize } from "sequelize-typescript";
import PaymentFacade from "./payment.facade";
import { PaymentFacadeInputDto } from "./facade.interface";
import PaymentFacadeFactory from "../factory/facade.factory";


describe("Process Payment Facade unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("Should be able to create a transaction", async () => {
        const paymentRepository = new TransactionRepository();
        const useCase = new ProcessPaymentUseCase(paymentRepository);
        const facade = new PaymentFacade(useCase);

        const input: PaymentFacadeInputDto = {
            orderId: "12",
            amount: 100,
        };

        const result = await facade.process(input);
        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe("approved");
    });

    it("Should be able to create a transaction using factory", async () => {
        const facade = PaymentFacadeFactory.create();

        const input: PaymentFacadeInputDto = {
            orderId: "12",
            amount: 100,
        };

        const result = await facade.process(input);
        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe("approved");
    });
});