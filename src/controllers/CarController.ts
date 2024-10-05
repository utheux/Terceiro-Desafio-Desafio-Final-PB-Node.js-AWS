import { Request, Response } from "express";
import CreateCarService from "../services/carServices/CreateCarService";

class CarController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {model, color, year, valuePerDay, accessories, numberOfPassengers} = req.body;
        
        try {
            const createCar = new CreateCarService();
            const car = await createCar.execute({model, color, year, valuePerDay, accessories, numberOfPassengers});

            return res.status(201).json(car);

        } catch(error) {
            return res.status(400).json({erro: error.message})
        }
    }
}

export default CarController;