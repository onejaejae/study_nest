import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfing: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'Board-app',
  entities: [__dirname + './../**/*.entity.{ts,js}'],
  synchronize: true,
};
