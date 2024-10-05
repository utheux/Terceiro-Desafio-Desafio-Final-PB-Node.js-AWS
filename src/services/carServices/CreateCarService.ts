import { AppDataSource } from "../../database/data-source";
import Car from "../../database/models/Car";

interface IRequestCar{
    model: string;
    color: string;
    year: number;
    valuePerDay: number;
    accessories: {name: string}[];
    numberOfPassengers: number;

}

class CreateCarService {
    public async execute({model, color, year, valuePerDay, accessories, numberOfPassengers}: IRequestCar): Promise<Car>{
        const carRepository = AppDataSource.getRepository(Car);
        const car = await carRepository.create({
            model,
            color,
            year,
            valuePerDay,
            accessories,
            numberOfPassengers
        });

        await carRepository.save(car);

        return car;
    }
}

export default CreateCarService;