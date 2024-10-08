import { AppDataSource } from '../../src/database/data-source';
import CarDTO from '../../src/api/dtos/CarDTO';
import CreateCarService from '../../src/api/services/carServices/CreateCarService';

jest.mock('../../src/database/data-source.ts', () => {
    return {
        AppDataSource: {
            getRepository: jest.fn(),
        },
    };
});

describe('testa CreateCarService', () => {
    let createCarService: CreateCarService;

    beforeEach(() => {
        createCarService = new CreateCarService();
    });

    it('Deve criar o carro e retornar um DTO', async () => {
        const carData = {
            model: 'Model X',
            color: 'Blue',
            year: 2022,
            valuePerDay: 500,
            acessories: [{ name: 'Air Conditioning' }],
            numberOfPassengers: 5,
        };

        const mockCarRepository = {
            create: jest.fn().mockReturnValue(carData),
            save: jest.fn().mockResolvedValue(carData),
        };

        (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockCarRepository);

        const result = await createCarService.execute(carData);

        expect(result).toBeInstanceOf(CarDTO);

        expect(result).toMatchObject({
            model: carData.model,
            color: carData.color,
            year: carData.year,
            valuePerDay: carData.valuePerDay,
            acessories: carData.acessories,
            numberOfPassengers: carData.numberOfPassengers,
        });
    });
});
