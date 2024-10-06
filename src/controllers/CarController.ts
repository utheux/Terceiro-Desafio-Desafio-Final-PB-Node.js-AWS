import { Request, Response } from 'express';
import CreateCarService from '../services/carServices/CreateCarService';
import UpdateCarService from '../services/carServices/UpdateCarService';

class CarController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {model, color, year, valuePerDay, acessories, numberOfPassengers} = req.body;
        
        try {
            const createCar = new CreateCarService();
            const car = await createCar.execute({model, color, year, valuePerDay, acessories, numberOfPassengers});

            return res.status(201).json(car);

        } catch(error) {
            return res.status(400).json({erro: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const {model, color, year, valuePerDay, acessories, numberOfPassengers} = req.body;
        const id = Number(req.params.id);

        try{
            const updateCar = new UpdateCarService();
            const updatedCar = await updateCar.execute({id, model, color, year, valuePerDay, acessories, numberOfPassengers });

            return res.status(200).json(updatedCar);

        } catch(error) {
            return res.status(400).json({erro: error.message});
        }



    }
}

export default CarController;