import IUser from "./IUser";

interface IService<T> {
  readAll(): Promise<T[]>;
  readOne(_id: string): Promise<T>;
  create(object: T): Promise<T>;
  updateOne(_id: string, object: T): Promise<void>
  destroy(_id: string): Promise<void>
}

interface IUserService extends IService<IUser> {
  login(email: string): Promise<string>;
  readAllByRole(role: string): Promise<IUser[]>;
}

export { IUserService }
export default IService;