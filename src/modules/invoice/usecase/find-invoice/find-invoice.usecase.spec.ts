import Invoice, { InvoiceProps } from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice_items";
import Address from "../../value-object/address";
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.dto";
import FindInvoiceUseCase from "./find-invoice.usecase";

const address = new Address("street", 1, "12345", "city", "building", "state");

const item = new InvoiceItems({
    name: "Item 1",
    price: 100,
    quantity: 3,
},
);

const invoiceProps: InvoiceProps = {
    name: "prod",
    document: "1234567890",
    address: address,
    items: [item]
};

const invoice = new Invoice(invoiceProps);

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find invoice usecase unit test", () => {
    it("should find an invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUseCase(invoiceRepository);

        const input: FindInvoiceUseCaseInputDTO = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.document).toBe(invoice.document);
        expect(result.name).toBe(invoice.name);
        expect(result.total).toBe(invoice.total());

        expect(result.items.length).toBe(1);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.total).toBe(invoice.total());

    });
});