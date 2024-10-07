import { Router } from 'express';
import ReservationController from '../api/controllers/ReservationController';
import authenticated from '../api/middlewares/authenticated';

const routerReservation = Router();
const reservationController = new ReservationController();

routerReservation.use(authenticated);

routerReservation.post('/reserve', reservationController.crate);

export default routerReservation;

