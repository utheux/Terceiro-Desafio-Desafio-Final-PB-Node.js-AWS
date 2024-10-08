import Reservation from '../../database/models/Reservation';

class ReservationDTO {
    id: number;
    startDate: Date;
    endDate: Date;
    finalValue: number;
    userId: number;
    carId: number;

    constructor(reservation: Reservation) {
        this.id = reservation.id;
        this.startDate = reservation.startDate;
        this.endDate = reservation.endDate;
        this.finalValue =reservation.finalValue;
        this.userId = reservation.userId;
        this.carId = reservation.carId;
    }
}

export default ReservationDTO;