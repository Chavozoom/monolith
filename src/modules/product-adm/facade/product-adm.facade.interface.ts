import { AddProductFacadeInputDto } from "./dto-interfaces/add-product.facede.interface.dto";
import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./dto-interfaces/check-stock.facede.interface.dto";

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
}