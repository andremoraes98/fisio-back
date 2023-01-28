import { Model } from 'mongoose';
import IModel from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  abstract readAll(): Promise<T[]>;
  abstract create(object: T): Promise<T>;
  abstract updateOne(_id: string, object: T): Promise<void>;
  abstract destroy(_id: string): Promise<void>;
}

export default MongoModel;