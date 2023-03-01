import { isValidObjectId } from 'mongoose';
import { IExerciseModel } from '../interfaces/IModel';
import { IExercise } from '../interfaces';
import errors from 'restify-errors';
import { IExerciseService } from '../interfaces/IService';

class ExerciseService implements IExerciseService {
  private _exercise: IExerciseModel;

  constructor(model: IExerciseModel) {
    this._exercise = model;
  }

  public async readAll(): Promise<IExercise[]> {
    const exercises = await this._exercise.readAll();

    return exercises;
  }

  public async readAllByMuscle(muscles: string[]): Promise<IExercise[]> {
    const exercises = await this._exercise.readAllByMuscle(muscles);

    return exercises;
  }

  public async readOne(_id: string): Promise<IExercise> {
    const exercise = await this._exercise.readOne(_id);

    if (!exercise) {
      throw new errors.NotFoundError('Exercício não encontrado!')
    }

    return exercise;
  }

  public async create(exercise: IExercise): Promise<IExercise> {
    const createdExercise = await this._exercise.create(exercise);

    return createdExercise;
  }

  public async updateOne(_id: string, object: IExercise): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new ReferenceError('Id inválido!')
    }

    const exercise = this._exercise.readOne(_id);

    if (!exercise) {
      throw new errors.NotFoundError('Exercício não encontrado!')
    }

    await this._exercise.updateOne(_id, {
      ...exercise,
      ...object,
    });
  }

  public async destroy(_id: string): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new ReferenceError('Id inválido!')
    }

    const exercise = this._exercise.readOne(_id);

    if (!exercise) {
      throw new errors.NotFoundError('Usuário não encontrado!')
    }
    
    await this._exercise.destroy(_id)
  }
}

export default ExerciseService;