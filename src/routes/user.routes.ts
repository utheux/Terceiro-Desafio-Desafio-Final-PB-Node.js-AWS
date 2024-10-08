import { Router } from 'express';
import UserController from '../api/controllers/UserController';
import authenticated from '../api/middlewares/authenticated';

const routerUser = Router();
const userController = new UserController();


routerUser.post('/user', userController.create);

routerUser.use(authenticated);

routerUser.put('/user', userController.update);
routerUser.delete('/user', userController.delete);
routerUser.get('/user', userController.getById);

export default routerUser;