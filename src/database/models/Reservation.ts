import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Car from './Car';

@Entity('reservations')
class Resevation {
    @PrimaryGeneratedColumn()
        id: number;
    
    @Column('date')
        startDate: Date;
    
    @Column('date')
        endDate: Date;
    
    @OneToOne(() => Car)
    @JoinColumn({name: 'car_id'})
        car: Car;
    
    @CreateDateColumn()
        created_at: Date;
    
    @UpdateDateColumn()
        updated_at: Date;

}

export default Resevation;