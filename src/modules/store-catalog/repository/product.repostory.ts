import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {

    async findAll(): Promise<Product[]> {
        try {
            const productModel = await ProductModel.findAll({});
            if (productModel.length === 0) {
                throw new Error("No products found");
            }

            const products: Product[] = productModel.map((product) => {
                product = product.toJSON();
                return new Product({
                    id: new Id(product.id),
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice
                });
            });
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
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
            salesPrice: toJsonProduct.salesPrice
        });
    }
}