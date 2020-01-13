import { UserService } from '../user.service';

describe('UserService', () => {
  const userRepository = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    addUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
  };

  const service: UserService = new UserService(userRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('throws when geting with wrong userId', () => {
    userRepository.getUser.mockResolvedValueOnce(undefined);
    expect(service.getUser(1)).rejects.toThrow();
  });

  it('successfully returns user with userId', async () => {
    const expectedUser = {
      id: 1,
      name: 'alex',
      createdAt: 1,
      country: 'USA',
    };
    userRepository.getUser.mockResolvedValueOnce(expectedUser);

    const actual = await service.getUser(1);
    expect(actual).toEqual(expectedUser);
  });

  it('successfully adds user', async () => {
    await service.addUser('alex', 'USA');
    expect(userRepository.addUser).toBeCalledTimes(1);
    expect(userRepository.addUser).toBeCalledWith('alex', 'USA');
  });

  it('successfully deletes user', async () => {
    await service.deleteUser(1);
    expect(userRepository.deleteUser).toBeCalledTimes(1);
    expect(userRepository.deleteUser).toBeCalledWith(1);
  });

  it('successfully gets all users', async () => {
    const expectedUserList = [{
      id: 1,
      name: 'alex',
      createdAt: 1,
      country: 'USA',
    }, {
      id: 2,
      name: 'nick',
      createdAt: 2,
      country: 'USA',
    },
    ];
    userRepository.getUsers.mockResolvedValueOnce(expectedUserList);

    const actual = await service.getUsers();
    expect(actual).toEqual(expectedUserList);
  });

  it('throws when updating with wrong userId', () => {
    userRepository.getUser.mockResolvedValueOnce(undefined);
    expect(service.updateUser(1, 'nick')).rejects.toThrow();
  });

  it('successfully updates user with userId', async () => {
    const expectedUser = {
      id: 1,
      name: 'alex',
      createdAt: 1,
      country: 'USA',
    };
    userRepository.getUser.mockResolvedValueOnce(expectedUser);

    const actual = await service.updateUser(1, 'nick', 'CA');
    expect(userRepository.updateUser).toBeCalledTimes(1);
    expect(userRepository.updateUser).toBeCalledWith({
      id: 1,
      name: 'nick',
      createdAt: expectedUser.createdAt,
      country: 'CA'});
  });
});
