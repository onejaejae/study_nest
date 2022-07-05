import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfing } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfing), BoardsModule],
})
export class AppModule {}
