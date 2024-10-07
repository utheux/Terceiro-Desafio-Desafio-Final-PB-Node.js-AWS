import { Request, Response } from 'express';
import AuthService from '../services/authServices/AuthService';


class AuthController {
    public async login(req: Request, res: Response): Promise<Response> {
        const {email, password} = req.body;
        const authService = new AuthService();

        try {

            const login = await authService.execute({email, password});
            return res.status(200).send(login);

        } catch(error) {
            return res.status(401).send({message: error.message});
        }


    }

}

export default AuthController;