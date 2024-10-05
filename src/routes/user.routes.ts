import { Router } from "express";
import UserController from "../controllers/UserController";

const routerUser = Router();
const userController = new UserController();

routerUser.post('/user', userController.create);

export default routerUser;