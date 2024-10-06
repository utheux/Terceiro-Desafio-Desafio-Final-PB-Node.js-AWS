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
        email: string;
    
    @Column('boolean')
        qualified: boolean;

    @Column()
        cep: string;
    
    @Column()
        neighbordhood:string;
    
    @Column()
        street: string;

    @Column()
        complement: string;

    @Column()
        city: string;


    @Column()
        uf: string;
     
    @Column()
        hashPassword: string;

    @CreateDateColumn()
        created_at: Date;
    
    @UpdateDateColumn()
        updated_at: Date;
}

export default User;