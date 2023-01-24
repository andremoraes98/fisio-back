import { model as mongooseCreateModel, Schema } from 'mongoose';
import IUser from '../interfaces/IUser';
import MongoModel from './MongoModel';

const userMongooseSchema = new Schema<IUser>({
  email: String,
  name: String,
  password: String,
});

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }

  public async readAll(): Promise<IUser[]> {
    const users = await this._model.find({}, {
      email: 1,
      name: 1,
      password: 1,
    });

    return users;
  }

  public async create(object: IUser): Promise<IUser> {
    const createdAset = this._model.create(object);

    return createdAset;
  }
}

export default User;