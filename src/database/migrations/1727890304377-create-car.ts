import { MigrationInterface, QueryRunner, Table } from 'typeorm';



export class CreateCar1727890304377 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'model',
                        type: 'varchar',
                    },
                    {
                        name: 'color',
                        type: 'varchar', 
                    },
                    {
                        name: 'year',
                        type: 'int',
                    },
                    {
                        name: 'valuePerDay',
                        type: 'float'
                    },
                    {
                        name: 'acessories',
                        type: 'text',
                    },
                    {
                        name: 'numberOfPassengers',
                        type: 'int'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }
                ],
            })
        );

        
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }

}

