import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

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

        await queryRunner.createForeignKey(
            'reservations',
            new TableForeignKey({
                columnNames: ['carId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cars',
                onDelete: 'CASCADE',      
            })
        );
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('reservations');

        if (!table) {
            throw new Error('Table "reservations" not found');
        }

        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('carId') !== -1);

        if (foreignKey) {
            await queryRunner.dropForeignKey('reservations', foreignKey);
        }

        await queryRunner.dropTable('reservations');
        
    }

}
