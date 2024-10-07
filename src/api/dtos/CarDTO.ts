import Car from '../../database/models/Car';

export default class CreateCarDTO {
    id: number;
    model: string;
    color: string;
    year: number;
    valuePerDay: number;
    acessories: {name: string}[];
    numberOfPassengers: number;

    constructor(car: Car) {
        this.id = car.id;
        this.model = car.model;
        this.color = car.color;
        this.year = car.year;
        this.valuePerDay = car.valuePerDay;
        this.acessories = car.acessories;
        this.numberOfPassengers = car.numberOfPassengers;
    }
}