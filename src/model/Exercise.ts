import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IExercise } from '../interfaces';
import MongoModel from './MongoModel';

export const exerciseMongooseSchema = new Schema<IExercise>({
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

  public async readAllByMuscle(muscle: string[]): Promise<IExercise[]> {
    const exercises = await this._model.find({ muscle: { $in: muscle } });

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