import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1593097954109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          // Coluna ID
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          // Coluna NAME
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          // Coluna EMAIL
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          // Coluna PASSWORD
          {
            name: 'password',
            type: 'varchar',
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
    await queryRunner.dropTable('users');
  }
}
