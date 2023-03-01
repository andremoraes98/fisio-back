import { NextFunction, Request, Response } from "express";
import errors from 'restify-errors';
import UserModel from "../model/User";
import bcrypt from 'bcrypt';

const userModel = new UserModel();

const validateBody = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new errors.MissingParameterError('Todos os campos são obrigatórios!');
  }

  next();
};

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const user = await userModel.findOneWhereEmail(email);

  if (!user) {
    throw new errors.NotFoundError('Email não cadastrado.');
  }

  if (user.email !== email) {
    throw new errors.NotAuthorizedError('Email incorreto');
  }

  next();
};

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const result = await userModel.findOneWhereEmail(email, true);

  if (!result) {
    throw new errors.NotFoundError('Email não cadastrado!');
  }

  if (!bcrypt.compareSync(password, result.password)) {
    throw new errors.NotAuthorizedError('Senha incorreta!');
  }

  next();
};

export {
  validateBody,
  validateEmail,
  validatePassword,
}