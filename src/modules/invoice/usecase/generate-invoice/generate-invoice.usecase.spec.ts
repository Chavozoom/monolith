import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn(),
    };
};

describe("Generate Invoice usecase unit test", () => {
    it("should add a Invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);

        const input: GenerateInvoiceUseCaseInputDto = {
            name: "Product 1",
            document: "123.456.789-10",
            street: "Rua 1",
            number: 123,
            complement: "building",
            city: "Cidade 1",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100,
                    quantity: 3,
                },
            ]
        };

        const result = await usecase.execute(input);

        expect(result).toHaveProperty("id");
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.items).toHaveLength(input.items.length);
        expect(result.items[0].name).toEqual(input.items[0].name);
        expect(result.items[0].price).toEqual(input.items[0].price);
        expect(result.items[0].id).toEqual(input.items[0].id);
        expect(result.items[0].quantity).toEqual(input.items[0].quantity);
    });
});