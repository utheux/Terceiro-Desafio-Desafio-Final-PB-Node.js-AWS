import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
        id: number;
    
    @Column()
        name: string;

    @Column()    
        cpf: string;

    @Column('date')
        birth: Date;
    
    @Column()
        cep: string;
    
    @Column()
        email: string;
    
    @Column()
        password: string;

    @CreateDateColumn()
        created_at: Date;
    
    @UpdateDateColumn()
        updated_at: Date;
}

export default User;