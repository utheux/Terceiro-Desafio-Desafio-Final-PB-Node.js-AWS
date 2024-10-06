import User from '../database/models/User';

export default class CreateUserDTO {
    id: number;
    name: string;
    cpf: string;
    birth: Date;
    email: string;
    qualified: boolean;
    cep: string;
    neighbordhood: string;
    street: string;
    complement: string;
    city: string;
    uf: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.cpf = user.cpf;
        this.birth = user.birth;
        this.email = user.email;
        this.qualified = user.qualified;
        this.cep = user.cep;
        this.neighbordhood = user.neighbordhood;
        this.street = user.street;
        this.complement = user.complement;
        this.city = user.city;
        this.uf = user.uf;
      
    }
}