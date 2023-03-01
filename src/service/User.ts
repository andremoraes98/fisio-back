import { isValidObjectId } from 'mongoose';
import { IUserModel } from '../interfaces/IModel';
import { IUserService } from '../interfaces/IService';
import IUser from '../interfaces';
import errors from 'restify-errors';
import bcrypt from 'bcrypt';

class UserService implements IUserService {
  private _user: IUserModel;

  constructor(model: IUserModel) {
    this._user = model;
  }

  public async readAll(): Promise<IUser[]> {
    const users = await this._user.readAll();

    return users;
  }

  public async readAllByRole(role: string): Promise<IUser[]> {
    const users = await this._user.readAllByRole(role);

    return users;
  }

  public async readOne(_id: string): Promise<IUser> {
    const user = await this._user.readOne(_id);

    if (!user) {
      throw new errors.NotFoundError('Usuário não encontrado!')
    }

    return user;
  }

  public async create(user: IUser): Promise<IUser> {
    const { password } = user;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const createdUser = await this._user.create({
      ...user,
      password: encryptedPassword,
    });

    return createdUser;
  }

  public async updateOne(_id: string, object: IUser): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new ReferenceError('Id inválido!')
    }
  
    const { password } = object;

    const user = await this._user.readOne(_id, !password);

    if (!user) {
      throw new errors.NotFoundError('Usuário não encontrado!')
    }

    if (!password) {
      await this._user.updateOne(_id, {
        ...object,
        password: user.password,
      });
    } else {
      const encryptedPassword = bcrypt.hashSync(password, 10);
  
      await this._user.updateOne(_id, {
        ...object,
        password: encryptedPassword,
      });
    }
  }

  public async destroy(_id: string): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new ReferenceError('Id inválido!')
    }

    const user = this._user.readOne(_id);

    if (!user) {
      throw new errors.NotFoundError('Usuário não encontrado!')
    }
    
    await this._user.destroy(_id)
  }
  
  public async login(email: string): Promise<IUser> {
    const user = await this._user.findOneWhereEmail(email, false);

    if (!user) {
      throw new errors.NotFoundError('Usuário não encontrado!')
    };

    return user
  }
}

export default UserService;