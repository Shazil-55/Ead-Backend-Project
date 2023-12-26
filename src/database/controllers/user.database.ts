/* eslint-disable @typescript-eslint/no-explicit-any */
//
import { Knex } from 'knex';
import { Entities } from '../../helpers';
import { AppError } from '../../helpers/errors';
import { Logger } from '../../helpers/logger';
import * as UserModel from '../../model/user.model';
import { DatabaseErrors } from '../../helpers/contants';

export class UserDatabase {
  private logger: typeof Logger;

  private GetKnex: () => Knex;

  private RunQuery: (query: Knex.QueryBuilder) => Promise<{ res?: any[]; err: any }>;

  public constructor(args: {
    GetKnex: () => Knex;
    RunQuery: (query: Knex.QueryBuilder) => Promise<{ res?: any[]; err: any }>;
  }) {
    this.logger = Logger;
    this.GetKnex = args.GetKnex;
    this.RunQuery = args.RunQuery;
  }

  async CreateUser(user: Partial<Entities.User>): Promise<string> {
    this.logger.info('Db.CreateUser', { user });

    const knexdb = this.GetKnex();

    const query = knexdb('users').insert(user, 'id');

    const { res, err } = await this.RunQuery(query);

    if (err) {
      if (err.code === DatabaseErrors.DUPLICATE) {
        this.logger.error('Db.CreateUser failed due to duplicate key', err);

        throw new AppError(400, 'User already exists');
      }
      throw new AppError(400, 'User not created');
    }

    if (!res || res.length !== 1) {
      this.logger.info('Db.CreateUser User not created', err);

      throw new AppError(400, `User not created `);
    }

    const { id } = res[0];
    return id;
  }

  async GetUser(where: Partial<Entities.User>, returnPassword = false): Promise<Entities.User | undefined> {
    this.logger.info('Db.GetUser', { where });

    const knexdb = this.GetKnex();

    const query = knexdb('users').where(where);
    const { res, err } = await this.RunQuery(query);

    if (err) return undefined;

    if (!res || res.length === 0) {
      this.logger.info('No user found', res);
      return undefined;
    }

    if (!returnPassword) delete res[0].password;

    return res[0];
  }

  async GetStudents(): Promise<Entities.Student[] | undefined> {
    this.logger.info('Db.GetUser');

    const knexdb = this.GetKnex();

    const query = knexdb('students').select('*');
    const { res, err } = await this.RunQuery(query);

    if (err) return undefined;

    if (!res || res.length === 0) {
      this.logger.info('No student found', res);
      return undefined;
    }

    return res;
  }

  async UpdateStudents(id: string, toUpdate: Partial<Entities.Student>) {
    this.logger.info('Db.UpdateStudents', { id, toUpdate });

    const knexdb = this.GetKnex();

    const query = knexdb('students').where({ id: id }).update(toUpdate).returning('id');

    const { res, err } = await this.RunQuery(query);

    if (err) {
      this.logger.error('Db.UpdateLink Error updating students', err);
      throw new AppError(500, `Error updating students`);
    }

    if (!res || res.length !== 1) {
      this.logger.error('Db.UpdateLink Update students');
      throw new AppError(404, 'Update students failed');
    }
  }

  async DeleteStudent(where: Partial<Entities.Student>): Promise<void> {
    this.logger.info('Db.DeleteStudent', { where });

    const knexdb = this.GetKnex();

    const query = knexdb('students').where(where).del();
    const { err } = await this.RunQuery(query);

    if (err) throw new AppError(400, 'Error deleting the students');
  }

  async CreateStudent(student: UserModel.AddStudent): Promise<string> {
    this.logger.info('Db.CreateUser', { student });

    const knexdb = this.GetKnex();

    const query = knexdb('students').insert(student, 'id');

    const { res, err } = await this.RunQuery(query);

    if (err) {
      if (err.code === DatabaseErrors.DUPLICATE) {
        this.logger.error('Db.CreateUser failed due to duplicate key', err);

        throw new AppError(400, 'User already exists');
      }
      throw new AppError(400, 'User not created');
    }

    if (!res || res.length !== 1) {
      this.logger.info('Db.CreateUser User not created', err);

      throw new AppError(400, `User not created `);
    }

    const { id } = res[0];
    return id;
  }
}
