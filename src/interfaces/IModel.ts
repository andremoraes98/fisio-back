import IUser from "./IUser";

interface IModel<T> {
  readAll(): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  create(object: T): Promise<T>;
  updateOne(_id: string, object: T): Promise<void>;
  destroy(_id: string): Promise<void>;
}

interface IUserModel extends IModel<IUser> {
  findOneWhereEmail(email: string): Promise<IUser | null>;
}

export {IUserModel}
export default IModel;