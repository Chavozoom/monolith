import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repostory";
import Client, { ClientProps } from "../domain/client.entity";

describe("ClientRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    it("should create a client", async () => {
        const clientProps: ClientProps = {
            id: new Id("1"),
            name: "client",
            email: "test@example.com",
            address: "street",
        };

        const client = new Client(clientProps);
        const clientRepository = new ClientRepository();
        await clientRepository.add(client);

        const clientDb = await ClientModel.findOne({
            where: { id: clientProps.id.id },
        });

        const toJsonClientDb = clientDb.toJSON();

        expect(toJsonClientDb.id).toBe(clientProps.id.id);
        expect(toJsonClientDb.name).toBe(clientProps.name);
        expect(toJsonClientDb.email).toBe(clientProps.email);
        expect(toJsonClientDb.address).toBe(clientProps.address);
    });

    it("should find a client", async () => {
        const clientRepository = new ClientRepository();

        await ClientModel.create({
            id: "1",
            name: "John",
            email: "john@example.com",
            address: "address",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const client = await clientRepository.find("1");

        expect(client.id.id).toBe("1");
        expect(client.name).toBe("John");
        expect(client.email).toBe("john@example.com");
        expect(client.address).toBe("address");
    });
});