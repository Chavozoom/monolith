import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    async find(id: string): Promise<Product> {
        let productModel;
        try {
            productModel = await ProductModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
            });
        }
        catch (error) {
            throw new Error(`Product with Id: ${id} not found`);
        }

        const toJsonProduct = productModel.toJSON();

        return new Product({
            id: new Id(toJsonProduct.id),
            name: toJsonProduct.name,
            description: toJsonProduct.description,
            purchasePrice: toJsonProduct.purchasePrice,
            stock: toJsonProduct.stock,
            createdAt: toJsonProduct.createdAt,
            updatedAt: toJsonProduct.updatedAt,
        });
    }
}