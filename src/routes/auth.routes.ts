import { Router } from 'express';
import AuthController from '../api/controllers/AuthController';

const routerAuth = Router();
const authController = new AuthController();

routerAuth.post('/auth', authController.login);

export default routerAuth;

