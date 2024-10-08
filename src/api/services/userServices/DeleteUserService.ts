import { AppDataSource } from '../../../database/data-source';
import User from '../../../database/models/User';

class DeleteUserService {
    public async execute({id}){
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({where: {id}});

        if(!user) {
            throw new Error('user not found');
        }

        await userRepository.remove(user);


    }
}

export default DeleteUserService;