import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticated from '../middlewares/authenticated';

const routerUser = Router();
const userController = new UserController();


routerUser.post('/user', userController.create);

routerUser.use(authenticated);

routerUser.put('/user/:id', userController.update);

export default routerUser;