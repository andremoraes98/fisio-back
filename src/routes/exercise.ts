import { Router } from 'express';
import ExerciseController from '../controler/Exercise';
import ExerciseService from '../service/Exercise';
import ExerciseModel from '../model/Exercise';

const route = Router();

const exerciseModel = new ExerciseModel();
const exerciseService = new ExerciseService(exerciseModel);
const exerciseController = new ExerciseController(exerciseService);

route.get('/exercise', (req, res) => exerciseController.readAll(req, res));
route.get('/exercise/:id', (req, res) => exerciseController.readOne(req, res));
route.get('/exercise/muscles', (req, res) => exerciseController.readAllByMuscles(req, res));
route.put('/exercise', (req, res) => exerciseController.create(req, res));
route.post('/exercise/:id', (req, res) => exerciseController.updateOne(req, res));
route.delete('/exercise/:id', (req, res) => exerciseController.destroy(req, res));

export default route;