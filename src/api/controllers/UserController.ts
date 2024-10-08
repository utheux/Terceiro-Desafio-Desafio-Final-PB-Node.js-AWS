import CreateUserService from '../services/userServices/CreateUserService';
import { Request, Response} from 'express';
import UpdateUserService from '../services/userServices/UpdateUserService';
import DeleteUserService from '../services/userServices/DeleteUserService';
import ShowByIdService from '../services/userServices/ShowByIdService';
import { createUserSchema, updateUserSchema } from '../validations/userValidations';


interface AuthenticatedRequest extends Request {
    userId?: number;
    userEmail?: string;
}

class UserController {
    public async create(request: Request, response: Response): Promise<Response>{
        const { error } = createUserSchema.validate(request.body);

        if (error) {
            return response.status(400).json({ error: error.details[0].message });
        }
        const { name, cpf, birth, cep, email, password} = request.body;
        const createUser = new CreateUserService();
        
        try {
            const user = await createUser.execute({
                name,
                cpf,
                birth,
                cep,
                email,
                password
            });
    
            return response.json(user);

        } catch(error) {
            return response.status(400).json({ error: error.message });

        }

    }

    public async update(request: AuthenticatedRequest, response: Response): Promise<Response>{
        const { error } = updateUserSchema.validate(request.body);

        if (error) {
            return response.status(400).json({ error: error.details[0].message });
        }
        const id = Number(request.userId);
        const { name, cpf, birth, cep, email, password} = request.body;
        const updateUser = new UpdateUserService();
        
        try {
            const user = await updateUser.execute({
                id,
                name,
                cpf,
                birth,
                cep,
                email,
                password
            });
    
            return response.json(user);

        } catch(error) {
            return response.status(400).json({ error: error.message });

        }

    }

    public async delete(request: AuthenticatedRequest, response: Response): Promise<Response> {
        const id = Number(request.userId);
        const deleteUser = new DeleteUserService();

        try{
            await deleteUser.execute({id});
            return response.status(204).send();

        } catch(error) {
            return response.status(400).json({ error: error.message });
        }
    }

    public async getById(request: AuthenticatedRequest, response: Response): Promise<Response> {
        const id = Number(request.userId);
        const showById = new ShowByIdService();

        try {
            const user = await showById.execute({id});
            return response.status(200).json(user);

        } catch (error) {
            return response.status(400).json({ error: error.message });

        }
    }



    
}

export default UserController;