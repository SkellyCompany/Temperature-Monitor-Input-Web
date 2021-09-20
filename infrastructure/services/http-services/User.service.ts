import { GetServerSidePropsContext } from "next";
import { IUserDTO } from '../../../domain/dtos/IUserDTO';
import { User } from '../../../domain/entities/User';
import { AuthorizationType, HttpService, ResponseType } from './core/Http.service';
import { IResponse } from './core/IResponse';

class UserService {
  private readonly userUrl: string = "/user";

  private readonly service: HttpService;

  constructor(ctx: GetServerSidePropsContext = null) {
    this.service = new HttpService(ctx);
  }

  public async fetchAllUsers(): Promise<IResponse<User[]>> {
    return this.service.get<IUserDTO[], User>(
      this.userUrl,
      AuthorizationType.AUTHORIZE,
      ResponseType.ARRAY,
      User
    ) as Promise<IResponse<User[]>>;
  }

  public async fetchUser(id: string): Promise<IResponse<User>> {
    return this.service.get<IUserDTO, User>(
      this.userUrl + "/" + id,
      AuthorizationType.AUTHORIZE,
      ResponseType.SINGLE,
      User
    ) as Promise<IResponse<User>>;
  }

  public async createUser(newUser: User): Promise<IResponse<User>> {
    return this.service.post(
      this.userUrl,
      newUser,
      AuthorizationType.AUTHORIZE,
      ResponseType.SINGLE,
      User
    ) as Promise<IResponse<User>>;
  }

  public async updateUser(updatedUser: User): Promise<IResponse<void>> {
    return this.service.put(
      this.userUrl,
      updatedUser,
      AuthorizationType.AUTHORIZE
    ) as Promise<IResponse<void>>;
  }

  public async deleteUser(user: User): Promise<IResponse<void>> {
    return this.service.delete(
      this.userUrl + "/" + user.id,
      user,
      AuthorizationType.AUTHORIZE
    ) as Promise<IResponse<void>>;
  }
}

export default UserService;
