import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1593039996468
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          // Coluna ID
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          // Coluna PROVIDER
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          // Coluna DATE
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          // TIMESTAMPS
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
