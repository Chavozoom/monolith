import UseCasesInterface from "../../@shared/domain/usecases/use-case.interface";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";
import { AddClientFacadeInputDto } from "./interfaces/add-client.facade.dto";
import { FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./interfaces/find-client.facade.dto";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addClientUseCase: UseCasesInterface;
    private _findClientUseCase: UseCasesInterface;

    constructor(useCaseProps: UseCasesProps) {
        this._addClientUseCase = useCaseProps.addClientUseCase;
        this._findClientUseCase = useCaseProps.findClientUseCase;
    }

    add(input: AddClientFacadeInputDto): Promise<void> {
        return this._addClientUseCase.execute(input);
    }

    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return this._findClientUseCase.execute(input);
    }
}

export interface UseCasesProps {
    addClientUseCase: UseCasesInterface;
    findClientUseCase: UseCasesInterface;
}