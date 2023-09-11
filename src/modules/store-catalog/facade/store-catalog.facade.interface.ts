export interface FindStoreCatalogFacadeInputDto {
    id: string;
}

export interface FindStoreCatalogFacadeOutputDtoOptions {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDtoOptions {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}
export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDtoOptions>;
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDtoOptions>;
}