import IUser, { IExercise } from ".";

interface IService<T> {
  readAll(): Promise<T[]>;
  readOne(_id: string): Promise<T>;
  create(object: T): Promise<T>;
  updateOne(_id: string, object: T): Promise<void>
  destroy(_id: string): Promise<void>
}

interface IUserService extends IService<IUser> {
  login(email: string): Promise<IUser>;
  readAllByRole(role: string): Promise<IUser[]>;
}

interface IExerciseService extends IService<IExercise> {
  readAllByMuscle(muscles: string[]): Promise<IExercise[]>;
}

export { IUserService, IExerciseService }
export default IService;