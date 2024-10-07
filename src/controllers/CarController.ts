import { Request, Response } from 'express';
import CreateCarService from '../services/carServices/CreateCarService';
import UpdateCarService from '../services/carServices/UpdateCarService';
import ListCarService from '../services/carServices/ListCarService';

class CarController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {model, color, year, valuePerDay, acessories, numberOfPassengers} = request.body;
        
        try {
            const createCar = new CreateCarService();
            const car = await createCar.execute({model, color, year, valuePerDay, acessories, numberOfPassengers});

            return response.status(201).json(car);

        } catch(error) {
            return response.status(400).json({erro: error.message});
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {model, color, year, valuePerDay, acessories, numberOfPassengers} = request.body;
        const id = Number(request.params.id);

        try{
            const updateCar = new UpdateCarService();
            const updatedCar = await updateCar.execute({id, model, color, year, valuePerDay, acessories, numberOfPassengers });

            return response.status(200).json(updatedCar);

        } catch(error) {
            return response.status(400).json({erro: error.message});
        }
    }

    public async list(request: Request, response: Response) : Promise<Response> {
        try {
            const listCars = new ListCarService();
            const cars = await listCars.execute();

            return response.status(200).json(cars);
        } catch(error) {
            return response.status(400).json({erro: error.message});

        }
    }
}

export default CarController;