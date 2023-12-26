import { Db } from '../../database/db';
import { AppError } from '../../helpers/errors';
import { Logger } from '../../helpers/logger';
import { Entities, Hash } from '../../helpers';
import * as UserModels from '../../model/user.model';
import * as AuthModel from '../../model/auth.model';
import { UserTypes } from '../../helpers/entities';
import * as Token from '../../helpers/token';

export class UserService {
  private db: Db;

  constructor(args: { db: Db }) {
    Logger.info('UserService initialized...');
    this.db = args.db;
  }

  public async GetStudents(): Promise<Entities.Student[] | void> {
    Logger.info('UserService.GetStudents');

    const fetchedUsers = await this.db.User.GetStudents();
    if (!fetchedUsers) throw new AppError(400, 'cannot fetch students');
    return fetchedUsers;
  }

  public async CreateStudent(student: UserModels.AddStudent): Promise<void> {
    Logger.info('AuthService.CreateUser', { student });

    const fetchedUser = await this.db.User.CreateStudent(student);
  }

  public async UpdateStudents(id: string, where: Partial<Entities.Student>): Promise<void> {
    Logger.info('AuthService.UpdateStudents', { id, where });

    const fetchedUser = await this.db.User.UpdateStudents(id, where);
  }

  public async DeleteStudent(id: string): Promise<void> {
    Logger.info('AuthService.DeleteStudent', { id });

    const fetchedUser = await this.db.User.DeleteStudent({ id });
  }
}
