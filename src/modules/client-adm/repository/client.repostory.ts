import Id from "../../@shared/domain/value-object/id.value-object";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";
import Client from "../domain/client.entity";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async find(id: string): Promise<Client> {
        let clientModel;
        try {
            clientModel = await ClientModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
            });
        }
        catch (error) {
            throw new Error(`Client with Id: ${id} not found`);
        }

        const toJsonClient = clientModel.toJSON();

        return new Client({
            id: new Id(toJsonClient.id),
            name: toJsonClient.name,
            email: toJsonClient.email,
            address: toJsonClient.address,
            createdAt: toJsonClient.createdAt,
            updatedAt: toJsonClient.updatedAt,
        });
    }
}