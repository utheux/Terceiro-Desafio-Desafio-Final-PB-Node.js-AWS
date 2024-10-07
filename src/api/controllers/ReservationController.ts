import { Request, Response } from 'express';
import CreateReservationService from '../services/reservationServices/CreateReservationService';

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
}

export default ReservationController;