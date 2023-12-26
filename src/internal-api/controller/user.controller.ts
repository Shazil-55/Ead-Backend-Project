import * as express from 'express';
import { Response, Request } from 'express';
import { Db } from '../../database/db';
import { Logger } from '../../helpers/logger';
import { genericError, RequestBody, RequestQuery } from '../../helpers/utils';
import { UserService } from '../services/user.service';
import { Entities, Hash } from '../../helpers';
import * as UserModel from '../../model/user.model';

export class UserController {
  public router: express.Router;

  constructor() {
    Logger.info('User controller initialized...');
    this.router = express.Router();
    this.UserRouter();
  }

  private UserRouter(): void {
    this.router.get('/students', async (req: Request, res: Response) => {
      let body;
      try {
        const db = res.locals.db as Db;
        const service = new UserService({ db });
        const response = await service.GetStudents();

        body = {
          data: response,
        };
      } catch (error) {
        genericError(error, res);
      }
      res.json(body);
    });

    this.router.put('/student/:id', async (req: RequestBody<Partial<Entities.Student>>, res: Response) => {
      let body;
      try {
        const db = res.locals.db as Db;
        const service = new UserService({ db });
        const studentId = req.params.id;

        const response = await service.UpdateStudents(studentId, req.body);

        body = {
          data: response,
        };
      } catch (error) {
        genericError(error, res);
      }
      res.json(body);
    });

    this.router.delete('/student/:id', async (req: Request, res: Response) => {
      let body;
      try {
        const db = res.locals.db as Db;
        const service = new UserService({ db });
        const studentId = req.params.id;

        const response = await service.DeleteStudent(studentId);

        body = {
          data: response,
        };
      } catch (error) {
        genericError(error, res);
      }
      res.json(body);
    });

    this.router.post('/student', async (req: RequestBody<UserModel.AddStudent>, res: Response) => {
      let body;
      try {
        await UserModel.RegisterStudentBodySchema.validateAsync(req.body, {
          abortEarly: false,
        });

        const db = res.locals.db as Db;

        const service = new UserService({ db });

        await service.CreateStudent(req.body);
      } catch (error) {
        genericError(error, res);
      }
      res.json(body);
    });
  }
}
