import { Sequelize } from "sequelize-typescript";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repostory";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import { FindClientFacadeInputDto } from "./interfaces/find-client.facade.dto";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import { AddClientFacadeInputDto } from "./interfaces/add-client.facade.dto";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};

const client = new Client({
    id: new Id("1"),
    name: "John",
    email: "john@gmail.com",
    address: "123 Main St",
});

describe("ClientAdmFacade test", () => {
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
        const clientRepository = new ClientRepository();
        const addClientUseCase = new AddClientUseCase(clientRepository);

        const clientFacade = new ClientAdmFacade({
            addClientUseCase: addClientUseCase,
            findClientUseCase: undefined
        });

        const input: AddClientFacadeInputDto = {
            id: "1",
            name: "John",
            email: "john@gmail.com",
            address: "123 Main St",
        };

        await clientFacade.add(input);

        const client = await clientRepository.find("1");

        expect(client.id.id).toEqual(input.id);
        expect(client.name).toEqual(input.name);
        expect(client.email).toEqual(input.email);
        expect(client.address).toEqual(input.address);
    });

    it("should create a client using factory", async () => {
        const clientRepository = new ClientRepository();
        const clientFacade = ClientAdmFacadeFactory.create();

        const input: AddClientFacadeInputDto = {
            id: "1",
            name: "John",
            email: "john@gmail.com",
            address: "123 Main St",
        };

        await clientFacade.add(input);

        const client = await clientRepository.find("1");

        expect(client.id.id).toEqual(input.id);
        expect(client.name).toEqual(input.name);
        expect(client.email).toEqual(input.email);
        expect(client.address).toEqual(input.address);
    });

    it("should find a client", async () => {
        const clientRepository = MockRepository();

        const findClientUseCase = new FindClientUseCase(clientRepository);

        const clientFacade = new ClientAdmFacade({
            addClientUseCase: undefined,
            findClientUseCase: findClientUseCase
        });

        const input: FindClientFacadeInputDto = {
            id: "1"
        };

        const clientFound = await clientFacade.find(input);
        expect(clientFound.id).toEqual(input.id);
        expect(clientFound.name).toEqual(client.name);
        expect(clientFound.email).toEqual(client.email);
        expect(clientFound.address).toEqual(client.address);
    });

    it("should find a client using factory", async () => {
        const clientRepository = new ClientRepository();
        const clientFacade = ClientAdmFacadeFactory.create();

        const newClient = new Client({
            id: new Id("1"),
            name: "John",
            email: "john@gmail.com",
            address: "123 Main St",
        });

        await clientRepository.add(newClient);

        const input = {
            id: "1"
        };

        const client = await clientFacade.find(input);

        expect(client.id).toEqual(newClient.id.id);
        expect(client.name).toEqual(newClient.name);
        expect(client.email).toEqual(newClient.email);
        expect(client.address).toEqual(newClient.address);
    });
});