import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';



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

        await queryRunner.createTable(
            new Table({
                name: 'accessories',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
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
            'accessories',
            new TableForeignKey({
                columnNames: ['carId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cars',
                onDelete: 'CASCADE',      
            })
        );
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('accessories');

        if (!table) {
            throw new Error('Table "accessories" not found');
        }

        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('carId') !== -1);

        if (foreignKey) {
            await queryRunner.dropForeignKey('accessories', foreignKey);
        }

        await queryRunner.dropTable('accessories');
        await queryRunner.dropTable('cars');
    }

}

