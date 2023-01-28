import { isValidObjectId } from 'mongoose';
import IModel from '../interfaces/IModel';
import IService from '../interfaces/IService';
import IUser from '../interfaces/IUser';

class UserService implements IService<IUser> {
  private _user: IModel<IUser>;

  constructor(model: IModel<IUser>) {
    this._user = model;
  }

  public async readAll(): Promise<IUser[]> {
    const users = await this._user.readAll();

    return users;
  }

  public async create(user: IUser): Promise<IUser> {
    const createdUser = await this._user.create(user)

    return createdUser
  }

  public async updateOne(_id: string, object: IUser): Promise<void> {
    if (isValidObjectId(_id)) {
      throw new ReferenceError('Id inválido!')
    }

    await this._user.updateOne(_id, object)
  }

  public async destroy(_id: string): Promise<void> {
    if (isValidObjectId(_id)) {
      throw new ReferenceError('Id inválido!')
    }
    
    await this._user.destroy(_id)
  }
}

export default UserService;