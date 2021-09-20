import { IRegisterModel } from '../../../domain/models/auth/IRegisterModel';
import { ILoginModel } from '../../../domain/models/auth/ILoginModel';
import { AuthorizationType, HttpService, ResponseType } from './core/Http.service';
import { GetServerSidePropsContext } from "next";
import { CacheService } from "../../cache/Cache.service";
import { IResponse, ResponseStatus } from "./core/IResponse";
import { User } from '../../../domain/entities/User';
import { IUserDTO } from '../../../domain/dtos/IUserDTO';

export default class AuthService {
  private readonly loginUrl: string = "/authenticate";
  private readonly userProfileUrl: string = "/user/profile";
  private readonly registerUrl: string = "/register";

  private readonly service: HttpService;
  private readonly cacheService: CacheService;

  constructor(ctx: GetServerSidePropsContext = null) {
    this.service = new HttpService(ctx);
    this.cacheService = new CacheService(ctx);
  }

  public async login(loginInput: ILoginModel): Promise<IResponse<User>> {
    return this.service
      .post<IUserDTO, User>(
        this.loginUrl,
        loginInput,
        AuthorizationType.NONE,
        ResponseType.SINGLE,
        User
      )
      .then((response) => {
        if (response.status == ResponseStatus.Success) {
          const user = response.data as User;
          this.cacheService.saveToken(user.token);
        }
        return response;
      }) as Promise<IResponse<User>>;
  }

  public async register(registerInput: IRegisterModel): Promise<IResponse<User>> {
    return this.service.post<IUserDTO, User>(
      this.registerUrl,
      registerInput,
      AuthorizationType.NONE,
      ResponseType.SINGLE,
      User
    ) as Promise<IResponse<User>>;
  }

  public async getLoggedInUser(): Promise<IResponse<User>> {
    let token = this.cacheService.retrieveToken();
    if (token) {
      const currentUser = this.service.get<IUserDTO, User>(
        this.userProfileUrl,
        AuthorizationType.AUTHORIZE,
        ResponseType.SINGLE,
        User
      ) as Promise<IResponse<User>>;
      return currentUser;
    } else {
      let response: IResponse<User> = {
        status: ResponseStatus.Error,
        data: null,
        error: null,
      };
      return response;
    }
  }

  public logout() {
    this.cacheService.removeToken();
  }
}
