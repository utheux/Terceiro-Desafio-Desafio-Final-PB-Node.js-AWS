import { AppDataSource } from '../../../database/data-source';
import Reservation from '../../../database/models/Reservation';
import ReservationDTO from '../../dtos/ReservationDTO';

class ShowReserveIdService {
    public async execute(id: number): Promise<ReservationDTO>{
        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservation = await reservationRepository.findOneBy({id});
        
        if(!reservation) {
            throw new Error('Reservation not found!');         
        }

        return new ReservationDTO(reservation);

    }

}

export default ShowReserveIdService;