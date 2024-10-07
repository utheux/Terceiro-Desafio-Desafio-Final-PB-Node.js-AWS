import CreateUserService from '../services/userServices/CreateUserService';
import { Request, Response} from 'express';
import UpdateUserService from '../services/userServices/UpdateUserService';

class UserController {
    public async create(request: Request, response: Response): Promise<Response>{
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

    public async update(request: Request, response: Response): Promise<Response>{
        const id = Number(request.params.id);
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

    
}

export default UserController;