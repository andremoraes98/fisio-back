interface Index {
  _id?: string;
}

interface IUser extends Index {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  classes: string[];
}

export default IUser