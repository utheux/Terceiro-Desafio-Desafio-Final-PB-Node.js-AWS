import { AppDataSource } from '../../../database/data-source';
import Car from '../../../database/models/Car';
import Reservation from '../../../database/models/Reservation';
import ReservationDTO from '../../dtos/ReservationDTO';

interface IRequestUpdateReservation{
    reserveId: number;
    startDate: string;
    endDate: string;
    carId: number;

}

class UpdateReservationService {
    public async execute({reserveId, startDate, endDate, carId}: IRequestUpdateReservation): Promise<ReservationDTO>{
        const reservationRepository = AppDataSource.getRepository(Reservation);
        const carRepository = AppDataSource.getRepository(Car);

        const startDateFormatted = startDate.replace(/\//g, '-'); 
        const endDateFormatted = endDate.replace(/\//g, '-'); 
    
        const startDateParts = startDateFormatted.split('-'); 
        const endDateParts = endDateFormatted.split('-'); 
    
        const startDateCorrectFormat = `${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`; 
        const endDateCorrectFormat = `${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`; 

        const startDateParsed = new Date(startDateCorrectFormat);
        const endDateParsed = new Date(endDateCorrectFormat);
        

        const diffInMs = endDateParsed.getTime() - startDateParsed.getTime(); 
        const diffInDays = Math.ceil(diffInMs / (1000 * 3600 * 24));

        if (diffInDays < 1) {
            throw new Error('The reservation must be at least 1 day long');
        }

        const reservation = await reservationRepository.findOne({where: {id: reserveId}});

        if(!reservation) {
            throw new Error('Reservation not found!');
        }

        const id = carId;

        const car = await carRepository.findOneBy({id});

        if (!car) {
            throw new Error('Car not found!');
        }

        const finalValue = car.valuePerDay * diffInDays;

        
        reservation.carId = carId;
        reservation.startDate = startDateParsed;
        reservation.endDate = endDateParsed;
        reservation.finalValue = finalValue;

        await reservationRepository.save(reservation);

        return new ReservationDTO(reservation);

    }
}

export default UpdateReservationService;