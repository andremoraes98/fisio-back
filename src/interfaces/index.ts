interface Index {
  _id?: string;
}

interface InterExerciseDetails {
	exercise: InterExerciseDetails;
	series: string;
	repetitions: string;
	interval: string;
	concentricSpeed: string;
	eccentricSpeed: string;
	isometric: string[];
};

interface IUser extends Index {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  classes: Record<string, InterExerciseDetails[]>;
}

interface IExercise extends Index {
  name: string;
  link: string;
  muscle: string[];
}

export default IUser
export { IExercise, InterExerciseDetails }