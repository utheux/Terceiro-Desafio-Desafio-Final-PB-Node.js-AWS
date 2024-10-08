import User from '../../../database/models/User';
import { AppDataSource } from '../../../database/data-source';
import { GetCepService } from '../GetCepService';
import CreateUserDTO from '../../dtos/UserDTO';
import { hash } from 'bcryptjs';


interface IRequestUser {
    id: number;
    name: string;
    cpf: string;
    birth: Date;
    cep: string;
    email: string;
    password: string;
}

class UpdateUserService {
    public async execute({
        id,
        name, 
        cpf,
        birth,
        cep,
        email,
        password
    }: IRequestUser): Promise<CreateUserDTO> {
        const userRepository = AppDataSource.getRepository(User);

        const userInDb = await userRepository.findOne({where: {id}});

        if(!userInDb) {
            throw new Error('user not found');
        }

        const hashPassword = await hash(password, 8);

        const getCepService = new GetCepService();

        const cepSemCrase = cep.replace('-', '');

        const address = await getCepService.execute(cepSemCrase);

        if (!address) {
            throw new Error('Address not found for the zip code entered');
        }

        userInDb.name = name;
        userInDb.cpf = cpf;
        userInDb.birth = birth;
        userInDb.email = email;
        userInDb.cep = cep;
        userInDb.qualified = true;
        userInDb.neighbordhood = address.bairro;
        userInDb.street = address.logradouro;
        userInDb.complement = address.complemento;
        userInDb.city = address.localidade;
        userInDb.uf = address.uf;
        userInDb.hashPassword = hashPassword;



        

        const userCadastrado = await userRepository.save(userInDb);

        return new CreateUserDTO(userCadastrado);

    }
}

export default UpdateUserService;