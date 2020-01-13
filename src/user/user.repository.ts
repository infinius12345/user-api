import IUserRepository from './iuser.repository';
import {USERS} from './users.mock';
import {User} from './user';
import {TimestampService} from '../timestamp.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export default class UserRepository implements IUserRepository {
  private users: User[];

  constructor(private readonly timestampService: TimestampService) {
    this.users = USERS;
  }

  async deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  async getUser(userId: number): Promise<User> {
    return this.users.find(user => user.id === userId);
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async updateUser(user: User) {
    this.users = this.users.filter(u => u.id !== user.id);
    this.users.push(user);
  }

  async addUser(name: string, country: string) {
    this.users.push({
      id: this.users.length,
      name,
      createdAt: this.timestampService.now(),
      country,
    });
  }

}
