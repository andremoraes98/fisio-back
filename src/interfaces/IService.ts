interface IService<T> {
  readAll(): Promise<T[]>;
  create(object: T): Promise<T>;
}

export default IService;