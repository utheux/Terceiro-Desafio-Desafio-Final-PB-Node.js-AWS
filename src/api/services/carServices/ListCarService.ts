import { AppDataSource } from '../../../database/data-source';
import Car from '../../../database/models/Car';
import CarDTO from '../../dtos/CarDTO';

class ListCarService {
    public async execute(): Promise<CarDTO[]> {
        const carRepository = AppDataSource.getRepository(Car);
        const cars = await carRepository.find();

        const carsDTO = cars.map(car => new CarDTO(car));

        return carsDTO;
    }
}

export default ListCarService;