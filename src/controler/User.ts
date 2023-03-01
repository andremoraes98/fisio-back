import { Request, Response } from 'express';
import { IUserService } from '../interfaces/IService';
import IUser from '../interfaces';

class UserController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  public async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();

    return res.status(200).json(result);
  }

  public async readAllByRole(req: Request, res: Response) {
    const { role } = req.params;

    const result = await this._service.readAllByRole(role);

    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this._service.readOne(id);

    return res.status(200).json(user);
  }

  public async create(req: Request, res: Response) {
    const userInfos = req.body as IUser;
    const result = await this._service.create(userInfos);

    return res.status(201).json(result);
  }

  public async updateOne(req: Request, res: Response) {
    const { id } = req.params;
    const userInfos = req.body as IUser;

    await this._service.updateOne(id, userInfos);

    return res.send(204);
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.destroy(id);

    return res.send(204);
  }

  public async login(req: Request, res: Response) {
    const { email } = req.body;
    const user = await this._service.login(email);

    return res.status(200).json(user);
  };
}

export default UserController;