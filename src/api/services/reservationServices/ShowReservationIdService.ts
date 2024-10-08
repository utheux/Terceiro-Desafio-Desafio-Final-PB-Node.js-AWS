import { AppDataSource } from '../../../database/data-source';
import Reservation from '../../../database/models/Reservation';
import ReservationDTO from '../../dtos/ReservationDTO';

class ShowReserveIdService {
    public async execute({userId, id}): Promise<ReservationDTO>{
        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservation = await reservationRepository.findOneBy({id});
        
        if(!reservation) {
            throw new Error('Reservation not found!');         
        }

        if(!(reservation.userId == userId)){
            throw new Error('Reservation does not belongs to the user');
        } 

        return new ReservationDTO(reservation);

    }

}

export default ShowReserveIdService;