import { AppDataSource } from '../../src/database/data-source';
import CarDTO from '../../src/api/dtos/CarDTO';
import UpdateCarService from '../../src/api/services/carServices/UpdateCarService';
import Car from '../../src/database/models/Car';

jest.mock('../../src/database/data-source.ts', () => {
    return {
        AppDataSource: {
            getRepository: jest.fn(),
        },
    };
});

describe('testa UpdateCarService', () => {
    let updateCarService: UpdateCarService;

    beforeEach(() => {
        updateCarService = new UpdateCarService();
    });

    it('Deve atualizar o carro e retornar um DTO', async () => {
        const carData = {
            id: 1,
            model: 'Model S',
            color: 'White',
            year: 2020,
            valuePerDay: 600,
            acessories: [{ name: 'Air Conditioner' }],
            numberOfPassengers: 5,
        };

        const existingCar = new Car();
        Object.assign(existingCar, {
            id: 1,
            model: 'Old Model',
            color: 'Black',
            year: 2018,
            valuePerDay: 500,
            acessories: [{ name: 'Air Conditioning' }],
            numberOfPassengers: 4,
        });

        const mockCarRepository = {
            findOneBy: jest.fn().mockResolvedValue(existingCar),
            save: jest.fn().mockResolvedValue({ ...existingCar, ...carData }),
        };

        (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockCarRepository);

        const result = await updateCarService.execute(carData);

        expect(result).toBeInstanceOf(CarDTO);

        expect(result).toMatchObject({
            model: carData.model,
            color: carData.color,
            year: carData.year,
            valuePerDay: carData.valuePerDay,
            acessories: carData.acessories,
            numberOfPassengers: carData.numberOfPassengers,
        });

        expect(mockCarRepository.findOneBy).toHaveBeenCalledWith({ id: carData.id });
        expect(mockCarRepository.save).toHaveBeenCalledWith(expect.objectContaining(carData));
    });
});