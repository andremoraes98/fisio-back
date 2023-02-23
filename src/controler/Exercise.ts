import { Request, Response } from 'express';
import { IExerciseService } from '../interfaces/IService';
import { IExercise } from '../interfaces';

class ExerciseController {
  private _service: IExerciseService;

  constructor(service: IExerciseService) {
    this._service = service;
  }

  public async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();

    return res.status(200).json(result);
  }

  public async readAllByMuscles(req: Request, res: Response) {
    const { muscles } = req.body;

    const result = await this._service.readAllByMuscle(muscles);

    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this._service.readOne(id);

    return res.status(200).json(user);
  }

  public async create(req: Request, res: Response) {
    const exerciseInfos = req.body as IExercise;
    const result = await this._service.create(exerciseInfos);

    return res.status(201).json(result);
  }

  public async updateOne(req: Request, res: Response) {
    const { id } = req.params;
    const exerciseInfos = req.body as IExercise;

    await this._service.updateOne(id, exerciseInfos);

    return res.send(204);
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.destroy(id);

    return res.send(204);
  }
}

export default ExerciseController;