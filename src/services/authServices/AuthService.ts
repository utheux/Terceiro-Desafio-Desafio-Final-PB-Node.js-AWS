import { AppDataSource } from '../../database/data-source';
import User from '../../database/models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import JsonSecret from '../../config/JsonSecret';

interface IRequesAuth {
    email: string;
    password: string;
}

interface IResponseAuth {
    accessToken: string;
}

class AuthService {
    public async execute({email, password}: IRequesAuth): Promise<IResponseAuth>{
        const userRepository = AppDataSource.getRepository(User);

        const userDB = await userRepository.findOne({where: {email}});

        if(!userDB) {
            throw new Error('Unregistered user');
        }

        const samePasswords = await compare(password, userDB.hashPassword);

        if(!samePasswords){
            throw new Error('Invalid username or password');
        }

        const jsonSecret = new JsonSecret();

        const accessToken = sign({
            id: userDB.id,
            email: userDB.email,
        }, jsonSecret.secret, {
            expiresIn: 43200
        });

        return {accessToken};


    }


}

export default AuthService;