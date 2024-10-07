import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('reservations')
class Reservation {
    @PrimaryGeneratedColumn()
        id: number;
    
    @Column('date')
        startDate: Date;
    
    @Column('date')
        endDate: Date;

    @Column('decimal')
        finalValue: number;

    @Column()
        userId: number;
    
    @Column()
        carId: number;
    
    @CreateDateColumn()
        created_at: Date;
    
    @UpdateDateColumn()
        updated_at: Date;

}

export default Reservation;