import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";
import { FindClientInputDto } from "./find-client.usecase.dto";

const client = new Client({
    id: new Id("1"),
    name: "Client",
    email: "client@example.com",
    address: "123 Main St"
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};

describe("Find Client Usecase", () => {
    it("should find a client", async () => {
        const clientRepository = MockRepository();
        const usecase = new FindClientUseCase(clientRepository);

        const input: FindClientInputDto = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
    });
});