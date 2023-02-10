interface Index {
  _id?: string;
}

interface IUser extends Index {
  name: string;
  email: string;
  password: string;
}

export default IUser