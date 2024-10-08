import { AppDataSource } from '../../../database/data-source';
import Car from '../../../database/models/Car';
import CarDTO from '../../dtos/CarDTO';

class ShowCarIdService {
    public async execute(id: number): Promise<CarDTO>{
        const carRepository = AppDataSource.getRepository(Car);

        const car = await carRepository.findOneBy({id});

        if(!car) {
            throw new Error('Car not found!');
        }

        return new CarDTO(car);
    }
    
}

export default ShowCarIdService;