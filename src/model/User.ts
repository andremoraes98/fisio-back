import mongoose, { model as mongooseCreateModel, Schema } from 'mongoose';
import IUser, { InterExerciseDetails } from '../interfaces';
import MongoModel from './MongoModel';
import { IUserModel } from '../interfaces/IModel';
import { exerciseMongooseSchema } from './Exercise';


const exerciseDetailSchema = new Schema<InterExerciseDetails>({
  concentricSpeed: String,
  eccentricSpeed: String,
  exercise: exerciseMongooseSchema,
  interval: String,
  isometric: [String],
  repetitions: String,
  series: String,
});

const userMongooseSchema = new Schema<IUser>({
    name: String,
    email: String,
    classes: {
      A: {type: [exerciseDetailSchema], required: false},
      B: {type: [exerciseDetailSchema], required: false},
      C: {type: [exerciseDetailSchema], required: false},
      D: {type: [exerciseDetailSchema], required: false},
      E: {type: [exerciseDetailSchema], required: false},
      F: {type: [exerciseDetailSchema], required: false},
      G: {type: [exerciseDetailSchema], required: false},
      U: {type: [exerciseDetailSchema], required: false},
      M: {type: [exerciseDetailSchema], required: false},
    },
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
    const options = withPassword
      ? {
        _id: 1,
        classes: 1,
        email: 1,
        name: 1,
        role: 1,
        password: 1,
      }
      : {
        _id: 1,
        classes: 1,
        email: 1,
        name: 1,
        role: 1,
      };

    const user = await this._model.findById(_id, options);

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

  public async findOneWhereEmail(email: string, withPassword = false): Promise<IUser | null> {
    const options = withPassword
      ? {
        _id: 1,
        classes: 1,
        email: 1,
        name: 1,
        role: 1,
        password: 1,
      }
      : {
        _id: 1,
        classes: 1,
        email: 1,
        name: 1,
        role: 1,
      };

    const user = await this._model.findOne({ email }, options);

    return user;
  }
}

export default User;