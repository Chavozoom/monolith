import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import Transaction from "../domain/transaction";
import Id from "../../@shared/domain/value-object/id.value-object";
import TransactionRepository from "./transaction.repostory";

describe("ProductRepository test", () => {
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

    it("should save a transaction", async () => {
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "12",
        });

        transaction.process();

        const repository = new TransactionRepository();

        repository.save(transaction);

        const foundTransaction = await TransactionModel.findOne({
            where: { id: transaction.id.id },
        });

        const toJSONFoundTransaction = foundTransaction.toJSON();

        expect(toJSONFoundTransaction.amount).toBe(transaction.amount);
        expect(toJSONFoundTransaction.orderId).toBe(transaction.orderId);
        expect(toJSONFoundTransaction.id).toBe(transaction.id.id);
    });
});