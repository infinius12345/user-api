import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUser, UpdateUser} from './user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':userId')
  async getUser(@Param('userId', new ParseIntPipe()) userId) {
    return await this.userService.getUser(userId);
  }

  @Post()
  async addUser(@Body() user: CreateUser) {
    return await this.userService.addUser(user.name, user.country);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', new ParseIntPipe()) userId) {
    return await this.userService.deleteUser(userId);
  }

  @Patch()
  async updateUser(@Body() user: UpdateUser) {
    return await this.userService.updateUser(user.userId, user.name, user.country);
  }
}
