import { Router } from 'express';
import CarController from '../api/controllers/CarController';

const routerCar = Router();
const carController = new CarController();

routerCar.post('/car', carController.create);
routerCar.put('/car/:id', carController.update);
routerCar.get('/car', carController.list);
routerCar.delete('/car/:id', carController.delete);
routerCar.get('/car/:id', carController.getById);


export default routerCar;