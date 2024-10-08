import { AppDataSource } from '../../../database/data-source';
import Reservation from '../../../database/models/Reservation';

class ListReservationService {
    public async execute(userId): Promise<Reservation[]>{
        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservations = await reservationRepository.find();

        if (!reservations) {
            throw new Error('there are no reservations');
        }

        const reservationsUser = reservations.filter(reservation => reservation.userId == userId);

        return reservationsUser;
    }
}

export default ListReservationService;