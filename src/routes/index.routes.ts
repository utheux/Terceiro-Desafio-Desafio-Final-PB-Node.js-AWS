import { Router } from 'express';
import routerCar from './car.routes';
import routerUser from './user.routes';
import routerAuth from './auth.routes';
import routerReservation from './reservation.routes';

const routes = Router();
routes.use('/v1', routerCar);
routes.use('/v1', routerAuth);
routes.use('/v1', routerUser);
routes.use('/v1', routerReservation);


export default routes;