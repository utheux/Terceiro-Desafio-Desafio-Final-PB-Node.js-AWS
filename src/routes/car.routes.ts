import { Router } from "express";
import CarController from "../controllers/CarController";

const routerCar = Router();
const carController = new CarController();

routerCar.post('/car', carController.create);
routerCar.put('/car/:id', carController.update);

export default routerCar;