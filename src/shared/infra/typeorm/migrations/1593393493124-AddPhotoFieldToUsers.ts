import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPhotoFieldToUsers1593393493124
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'profile_picture',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'profile_picture');
  }
}
