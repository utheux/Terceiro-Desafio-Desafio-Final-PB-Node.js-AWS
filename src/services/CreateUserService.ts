import User from '../database/models/User';
import { AppDataSource } from '../database/data-source';
import { GetCepService } from './GetCepService';
import CreateUserDTO from '../dtos/CreateUserDTO';



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

        const getCepService = new GetCepService();

        const cepSemCrase = cep.replace('-', '');

        const address = await getCepService.execute(cepSemCrase);

        if (!address) {
            throw new Error('Endereço não encontrado para o CEP informado');
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
            password
        });

        const userCadastrado = await userRepository.save(user);

        return new CreateUserDTO(userCadastrado);

    }
}

export default CreateUserService;