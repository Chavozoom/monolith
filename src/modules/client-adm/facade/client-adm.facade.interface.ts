import { AddClientFacadeInputDto } from "./interfaces/add-client.facade.dto";
import { FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./interfaces/find-client.facade.dto";

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}