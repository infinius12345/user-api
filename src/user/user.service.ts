import { Injectable } from '@nestjs/common';
import IUserRepository from './iuser.repository';
import {User} from './user';
import {EntityDoesNotExistException} from '../exceptions';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.getUser(userId);
    if (user === undefined) {
      throw new EntityDoesNotExistException();
    }
    return user;
  }

  async addUser(name: string, country: string) {
    await this.userRepository.addUser(name, country);
  }

  async updateUser(userId: number, name?: string, country?: string) {
    const user = await this.userRepository.getUser(userId);
    if (user === undefined) {
      throw new EntityDoesNotExistException();
    }

    await this.userRepository.updateUser({
          id: userId,
          name: name ? name : user.name,
          createdAt: user.createdAt,
          country: country ? country : user.country,
        },
    );
  }

  async deleteUser(userId: number) {
    await this.userRepository.deleteUser(userId);
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }
}
