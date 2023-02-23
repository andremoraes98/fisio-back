import { model as mongooseCreateModel, Schema } from 'mongoose';
import IUser from '../interfaces';
import MongoModel from './MongoModel';
import { IUserModel } from '../interfaces/IModel';

const userMongooseSchema = new Schema<IUser>({
    name: String,
    email: String,
    classes: { type: [String], required: false},
    role: String,
    password: String,
  },
  { versionKey: false },
);

class User extends MongoModel<IUser> implements IUserModel {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }

  public async readAll(): Promise<IUser[]> {
    const users = await this._model.find({}, {
      password: 0
    });

    return users;
  }

  public async readAllByRole(role: string): Promise<IUser[]> {
    const users = await this._model.find({ role }, {
      password: 0
    });

    return users;
  }

  public async readOne(_id: string, withPassword = false): Promise<IUser | null> {
    const user = await this._model.findById(_id, {
      password: withPassword ? 1 : 0,
    });

    return user;
  }

  public async create(object: IUser): Promise<IUser> {
    const createdUser = await this._model.create(object);

    return createdUser;
  }

  public async updateOne(_id: string, object: IUser): Promise<void> {
    await this._model.findOneAndUpdate({ _id }, object);
  }

  public async destroy(_id: string): Promise<void> {
    await this._model.findByIdAndDelete(_id);
  }

  public async findOneWhereEmail(email: string): Promise<IUser | null> {
    const user = await this._model.findOne({ email });

    return user;
  }
}

export default User;