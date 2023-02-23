import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IExercise } from '../interfaces/IUser';
import MongoModel from './MongoModel';

const exerciseMongooseSchema = new Schema<IExercise>({
    name: String,
    link: String,
    muscle: [String],
  },
  { versionKey: false },
);

class User extends MongoModel<IExercise> {
  constructor(model = mongooseCreateModel('Exercise', exerciseMongooseSchema)) {
    super(model);
  }

  public async readAll(): Promise<IExercise[]> {
    const exercises = await this._model.find({});

    return exercises;
  }

  public async readAllByRole(role: string): Promise<IExercise[]> {
    const exercises = await this._model.find({ role });

    return exercises;
  }

  public async readOne(_id: string): Promise<IExercise | null> {
    const exercise = await this._model.findById(_id);

    return exercise;
  }

  public async create(object: IExercise): Promise<IExercise> {
    const createdExercise = await this._model.create(object);

    return createdExercise;
  }

  public async updateOne(_id: string, object: IExercise): Promise<void> {
    await this._model.findOneAndUpdate({ _id }, object);
  }

  public async destroy(_id: string): Promise<void> {
    await this._model.findByIdAndDelete(_id);
  }
}

export default User;