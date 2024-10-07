import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateReservation1727923725260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'reservations',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'startDate',
                        type: 'date',
                    },
                    {
                        name: 'endDate',
                        type: 'date'
                    },
                    {
                        name: 'finalValue',
                        type: 'number'
                    },
                    {
                        name: 'userId',
                        type: 'int',
                    },
                    {
                        name: 'carId',
                        type: 'int',
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
                ]
            })
        );

    
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reservations');
        
    }

}
