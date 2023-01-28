import { model as mongooseCreateModel, Schema } from 'mongoose';
import IUser from '../interfaces/IUser';
import MongoModel from './MongoModel';

const userMongooseSchema = new Schema<IUser>(
  {
    email: String,
    name: String,
    password: String,
  },
  { versionKey: false },
);

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }

  public async readAll(): Promise<IUser[]> {
    const users = await this._model.find({}, {
      password: 0
    });

    return users;
  }

  public async readOne(_id: string): Promise<IUser | null> {
    const user = await this._model.findOne({ _id });

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
}

export default User;