import { Router } from 'express';
import UserController from '../controler/User';
import UserService from '../service/User';
import UserModel from '../model/User';

const route = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

route.get('/user', (req, res) => userController.readAll(req, res));
route.put('/user', (req, res) => userController.create(req, res));
route.post('/user/:id', (req, res) => userController.updateOne(req, res));
route.delete('/user/:id', (req, res) => userController.destroy(req, res));

export default route;