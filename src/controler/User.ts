import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import IUser from '../interfaces/IUser';

class UserController {
  private _service: IService<IUser>;

  constructor(service: IService<IUser>) {
    this._service = service;
  }

  public async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();

    return res.status(200).json(result);
  }

  public async create(req: Request, res: Response) {
    const userInfos = req.body as IUser
    const result = await this._service.create(userInfos);

    return res.status(200).json(result);
  }
}

export default UserController;