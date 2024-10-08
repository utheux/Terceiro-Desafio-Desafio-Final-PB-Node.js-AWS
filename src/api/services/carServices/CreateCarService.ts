import { AppDataSource } from '../../../database/data-source';
import Car from '../../../database/models/Car';
import CarDTO from '../../dtos/CarDTO';

interface IRequestCar{
    model: string;
    color: string;
    year: number;
    valuePerDay: number;
    acessories: {name: string}[];
    numberOfPassengers: number;

}

class CreateCarService {
    public async execute({model, color, year, valuePerDay, acessories, numberOfPassengers}: IRequestCar): Promise<CarDTO>{
        const carRepository = AppDataSource.getRepository(Car);
        const car = await carRepository.create({
            model,
            color,
            year,
            valuePerDay,
            acessories,
            numberOfPassengers
        });

        await carRepository.save(car);

        return new CarDTO(car);
    }
}

export default CreateCarService;