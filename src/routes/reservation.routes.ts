import { Router } from 'express';
import ReservationController from '../api/controllers/ReservationController';
import authenticated from '../api/middlewares/authenticated';

const routerReservation = Router();
const reservationController = new ReservationController();

routerReservation.use(authenticated);

routerReservation.post('/reserve', reservationController.crate);
routerReservation.put('/reserve/:id', reservationController.update);
routerReservation.get('/reserve/:id', reservationController.getById);
routerReservation.delete('/reserve/:id', reservationController.delete);
routerReservation.get('/reserve', reservationController.list);

export default routerReservation;

