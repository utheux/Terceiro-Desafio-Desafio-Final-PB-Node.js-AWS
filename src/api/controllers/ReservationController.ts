import { Request, Response } from 'express';
import CreateReservationService from '../services/reservationServices/CreateReservationService';
import UpdateReservationService from '../services/reservationServices/UpdateReservationService';
import ShowReserveIdService from '../services/reservationServices/ShowReservationIdService';
import DeleteReservationService from '../services/reservationServices/DeleteReservationService';
import ListReservationService from '../services/reservationServices/ListReservationsService';

interface AuthenticatedRequest extends Request {
    userId?: number;
    userEmail?: string;
}

class ReservationController{
    public async crate(request: AuthenticatedRequest, response: Response): Promise<Response> {
        try{
            const { startDate, endDate, carId } = request.body;
            const userId = Number(request.userId);
            const createReservation = new CreateReservationService();

            const reservation = await createReservation.execute({startDate, endDate, carId, userId});

            return response.status(201).json(reservation);

        } catch (error) {
            return response.status(400).json({erro: error.message});

        }
    }

    public async update(request: AuthenticatedRequest, response: Response): Promise<Response>{
        try{
            const { startDate, endDate, carId } = request.body;
            const reserveId = Number(request.params.id);
            const updateReservationService = new UpdateReservationService();


            const reservation = await updateReservationService.execute({reserveId, startDate, endDate, carId});


            return response.status(201).json(reservation);

        } catch (error) {
            return response.status(400).json({erro: error.message});

        }
    }

    public async getById(request: AuthenticatedRequest, response: Response): Promise<Response> {
        try {
            const id = Number(request.params.id);
            const userId = Number(request.userId);

            const getReservation = new ShowReserveIdService();

            const reservation = await getReservation.execute({userId, id});

            return response.status(200).json(reservation);



        } catch(error) {
            return response.status(400).json({erro: error.message});
        }
    }

    public async delete(request: AuthenticatedRequest, response: Response): Promise<Response> {
        try {
            const id = Number(request.params.id);
            const userId = Number(request.userId);
            const deleteReservationService = new DeleteReservationService();

            await deleteReservationService.execute({userId, id});

            return response.status(204).send();


        } catch(error) {
            return response.status(400).json({erro: error.message});
        }
    }

    public async list(request: AuthenticatedRequest, response: Response): Promise<Response> {
        const userId = Number(request.userId);
        const listReservations = new ListReservationService();

        try {
            const reservations = await listReservations.execute(userId);

            return response.status(200).json(reservations);
        } catch(error) {
            return response.status(400).json({erro: error.message});
        }

    }
}

export default ReservationController;