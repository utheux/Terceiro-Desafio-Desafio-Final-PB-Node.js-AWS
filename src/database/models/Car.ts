import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('cars')
class Car {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        model: string;
    
    @Column()
        color: string;

    @Column()
        year: number;

    @Column('decimal')
        valuePerDay: number;

    @Column('simple-json')    
        acessories: {name: string}[];
    
    @Column()
    numberOfPassengers: number;

    @CreateDateColumn()
        created_at: Date;
    
    @UpdateDateColumn()
        updated_at: Date;


}

export default Car;