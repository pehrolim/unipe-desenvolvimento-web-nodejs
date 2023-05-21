import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ApiModule,
    TypeOrmModule.forRoot({
      type: 'mysql', //mysql
      port: 3306, // 3306
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'unipe-dev-web-2023',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: false,
      migrationsTableName: 'history',
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
