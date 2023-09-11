import AddClientUseCase from "./add-client.usecase";
import { AddClientInputDto } from "./add-client.usecase.dto";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Add Client Usecase", () => {
    it("should add a new client", async () => {
        const clientRepository = MockRepository();
        const usecase = new AddClientUseCase(clientRepository);

        const input: AddClientInputDto = {
            name: "Client",
            email: "client@example.com",
            address: "123 Main St",
        };

        const result = await usecase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
    });
});