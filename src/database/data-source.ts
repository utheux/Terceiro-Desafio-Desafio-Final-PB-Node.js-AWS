import { DataSource } from 'typeorm';
import { CreateCar1727890304377 } from './migrations/1727890304377-create-car';
import { CreateUser1727919912783 } from './migrations/1727919912783-create-user';
import { CreateReservation1727923725260 } from './migrations/1727923725260-create-reservation';
import Car from './models/Car';
import User from './models/User';
import Resevation from './models/Reservation';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'src/database/database.sqlite',
    synchronize: true,
    logging: false,
    entities: [Car, User, Resevation],
    migrations: [CreateCar1727890304377, CreateUser1727919912783, CreateReservation1727923725260],
    subscribers: []

});