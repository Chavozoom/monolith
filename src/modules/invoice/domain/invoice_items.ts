import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemsProps = {
    id?: Id;
    name: string;
    price: number;
    quantity: number;
};

export default class InvoiceItems {
    private _id: Id;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(props: InvoiceItemsProps) {
        this._id = props.id || new Id();
        this._name = props.name;
        this._price = props.price;
        this._quantity = props.quantity;
    }

    get id(): Id {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }

    total(): number {
        return this._price * this._quantity;
    }
}