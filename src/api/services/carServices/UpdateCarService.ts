import Car from '../../../database/models/Car';
import { AppDataSource } from '../../../database/data-source';
import CarDTO from '../../dtos/CarDTO';

interface IRequestCarUpdate{
    id: number;
    model: string;
    color: string;
    year: number;
    valuePerDay: number;
    acessories: {name: string}[];
    numberOfPassengers: number;

}

class UpdateCarService {
    public async execute({id, model, color, year, valuePerDay, acessories, numberOfPassengers}: IRequestCarUpdate): Promise<CarDTO>{
        const carRepository = AppDataSource.getRepository(Car);
        const car = await carRepository.findOneBy({id});

        if(!car){
            throw new Error('Car not found');
        }

        car.model = model;
        car.color = color;
        car.year = year;
        car.valuePerDay = valuePerDay;
        car.acessories = acessories;
        car.numberOfPassengers = numberOfPassengers;

        await carRepository.save(car);

        return new CarDTO(car);

    }
}

export default UpdateCarService;