import User from '../database/models/User';
import { AppDataSource } from '../database/data-source';


interface IRequestUser {
    name: string;
    cpf: string;
    birth: Date;
    cep: string;
    email: string;
    password: string;
}