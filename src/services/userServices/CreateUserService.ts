import User from '../../database/models/User';
import { AppDataSource } from '../../database/data-source';
import { GetCepService } from '../GetCepService';
import CreateUserDTO from '../../dtos/UserDTO';
import { hash } from 'bcryptjs';


interface IRequestUser {
    name: string;
    cpf: string;
    birth: Date;
    cep: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({
        name, 
        cpf,
        birth,
        cep,
        email,
        password
    }: IRequestUser): Promise<CreateUserDTO> {
        const userRepository = AppDataSource.getRepository(User);

        const userInDb = await userRepository.findOne({where: {email}});
        if(userInDb) {
            throw new Error('already registered user');
        }

        const hashPassword = await hash(password, 8);

        const getCepService = new GetCepService();

        const cepSemCrase = cep.replace('-', '');

        const address = await getCepService.execute(cepSemCrase);

        if (!address) {
            throw new Error('Address not found for the zip code entered');
        }

        const user = await userRepository.create({
            name, 
            cpf,
            birth,
            email,
            cep,
            qualified: true,
            neighbordhood: address.bairro,
            street: address.logradouro,
            complement: address.complemento,
            city: address.localidade,
            uf: address.uf,
            hashPassword
        });

        const userCadastrado = await userRepository.save(user);

        return new CreateUserDTO(userCadastrado);

    }
}

export default CreateUserService;