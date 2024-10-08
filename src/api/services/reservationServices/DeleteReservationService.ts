import { AppDataSource } from '../../../database/data-source';
import Reservation from '../../../database/models/Reservation';

class DeleteReservationService {
    public async execute({userId, id}): Promise<void>{
        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservation = await reservationRepository.findOneBy({id});

        if(!reservation) {
            throw new Error('Reservation not found!');

        }

        if(!(reservation.userId == userId)){
            throw new Error('Reservation does not belongs to the user');                  
        }
        
        await reservationRepository.remove(reservation);

    }

}

export default DeleteReservationService;