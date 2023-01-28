interface IService<T> {
  readAll(): Promise<T[]>;
  create(object: T): Promise<T>;
  updateOne(_id: string, object: T): Promise<void>
  destroy(_id: string): Promise<void>
}

export default IService;