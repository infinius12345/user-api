import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import UserRepository from './user.repository';
import IUserRepository from './iuser.repository';
import {TimestampService} from '../timestamp.service';

@Module({
  controllers: [UserController],
  providers: [UserService,
      TimestampService,
    { provide: IUserRepository, useClass: UserRepository }],
})
export class UserModule {}
