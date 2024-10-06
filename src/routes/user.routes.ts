import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

const routerUser = Router();
const userController = new UserController();
const authController = new AuthController();

routerUser.post('/user', userController.create);
routerUser.post('/auth', authController.login);

export default routerUser;