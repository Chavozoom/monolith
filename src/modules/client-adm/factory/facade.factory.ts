import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repostory";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static create() {
        const clientRepository = new ClientRepository();

        const findClientUseCase = new FindClientUseCase(clientRepository);
        const addClientUseCase = new AddClientUseCase(clientRepository);

        const clientFacade = new ClientAdmFacade({
            addClientUseCase: addClientUseCase,
            findClientUseCase: findClientUseCase
        });

        return clientFacade;
    }
}