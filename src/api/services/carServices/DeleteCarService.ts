import { AppDataSource } from '../../../database/data-source';
import Car from '../../../database/models/Car';

class DeleteCarService {
    public async execute(id: number): Promise<void> {
        const carRepository = AppDataSource.getRepository(Car);

        const car = await carRepository.findOneBy({id});

        if(!car) {
            throw new Error('Car not found!');
        }

        await carRepository.remove(car);
    }
}

export default DeleteCarService;