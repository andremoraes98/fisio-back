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

interface IExercise extends Index {
  name: string;
  link: string;
  muscle: string[];
}

export default IUser
export { IExercise }