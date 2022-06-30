import express, { Request, Response, NextFunction } from 'express';
import { handleJoiValidator } from '../middleware/handleJoiValidator';
import { createUser, findUserById, updateUser } from '../schemas/users.schema';
import Users from '../services/users.service';

const router = express.Router();
const service = new Users();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await service.findAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/specific/:id',
  handleJoiValidator(findUserById, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await service.findOneUser(id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  handleJoiValidator(createUser, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const response = await service.createUser(body);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  handleJoiValidator(findUserById, 'params'),
  handleJoiValidator(updateUser, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const response = await service.updateUser(id, body);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  handleJoiValidator(findUserById, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await service.removeUser(id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
