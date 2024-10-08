import { AppDataSource } from '../../../database/data-source';
import User from '../../../database/models/User';
import UserDTO from '../../dtos/UserDTO';

class ShowByIdService {
    public async execute({id}): Promise<UserDTO>{
        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOne({where: {id}});


        if(!user) {
            throw new Error('user not found');
        }

        return new UserDTO(user);
    }
}

export default ShowByIdService;