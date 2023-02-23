import IUser, { IExercise } from ".";

interface IModel<T> {
  readAll(): Promise<T[]>;
  readOne(_id: string, withPassword?: boolean): Promise<T | null>;
  create(object: T): Promise<T>;
  updateOne(_id: string, object: T): Promise<void>;
  destroy(_id: string): Promise<void>;
}

interface IUserModel extends IModel<IUser> {
  findOneWhereEmail(email: string): Promise<IUser | null>;
  readAllByRole(role: string): Promise<IUser[]>;
}

interface IExerciseModel extends IModel<IExercise> {
  readAllByMuscle(muscles: string[]): Promise<IExercise[]>;
}

export {IUserModel, IExerciseModel}
export default IModel;