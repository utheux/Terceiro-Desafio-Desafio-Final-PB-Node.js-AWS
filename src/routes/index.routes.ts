import { Router } from 'express';
import carRoutes from './car.routes';
import routerUser from './user.routes';

const routes = Router();

routes.use('/v1', carRoutes);
routes.use('/v1', routerUser);

export default routes;