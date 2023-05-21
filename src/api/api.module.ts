import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';
import { StageService } from './services/stage.service';
import { StageController } from './controllers/stage.controller';
import { Stage } from './entities/stage.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([
        User,
        Address,
        Stage
      ])
    ],
    providers: [UserService, AddressService, StageService],
    controllers: [UserController, StageController]
  })


export class ApiModule {}