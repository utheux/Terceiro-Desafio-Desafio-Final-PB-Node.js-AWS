import CreateUserService from '../services/userServices/CreateUserService';
import { Request, Response} from 'express';

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
}

export default UserController;