import {User} from './user';

export default abstract class IUserRepository {
  abstract getUsers(): Promise<User[]>;
  abstract getUser(userId: number): Promise<User>;
  abstract updateUser(user: User);
  abstract deleteUser(userId: number);
  abstract addUser(name: string, country: string);
}
