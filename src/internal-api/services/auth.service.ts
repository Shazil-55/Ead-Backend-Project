import { Db } from '../../database/db';
import { AppError } from '../../helpers/errors';
import { Logger } from '../../helpers/logger';
import * as AuthModel from '../../model/auth.model';
import { Entities, Hash } from '../../helpers';
import * as Token from '../../helpers/token';

export class AuthService {
  private db: Db;

  constructor(args: { db: Db }) {
    Logger.info('AuthService initialized...');
    this.db = args.db;
  }

  public async CreateUser(user: AuthModel.RegisterUserBody): Promise<AuthModel.Tokens> {
    Logger.info('AuthService.CreateUser', { user });

    const hashedPassword = await Hash.hashPassword(user.password);
    user.password = hashedPassword;

    const fetchedUser = await this.db.User.CreateUser(user);

    const dataForToken = { id: fetchedUser };
    const accessToken = Token.createAccessToken(dataForToken);
    const refreshToken = Token.createRefreshToken(dataForToken);

    const token: AuthModel.Tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return token;
  }

  public async GetLoginUser(user: AuthModel.UserLoginModel): Promise<AuthModel.Tokens> {
    Logger.info('AuthService.GetLoginUser', { user });

    const fetchedUser = await this.db.User.GetUser({ email: user.email }, true);

    if (!fetchedUser) throw new AppError(400, 'User not found');

    if (!fetchedUser.password) throw new AppError(400, 'User not found');
    const isCorrectPassword = await Hash.verifyPassword(user.password, fetchedUser.password);

    if (!isCorrectPassword) throw new AppError(400, `Invalid credentials `);

    const dataForToken = { id: fetchedUser.id };

    const accessToken = Token.createAccessToken(dataForToken);
    const refreshToken = Token.createRefreshToken(dataForToken);

    const token: AuthModel.Tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return token;
  }
}
