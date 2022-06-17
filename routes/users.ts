import express, { Request, Response, NextFunction } from 'express';
import { handleJoiValidator } from '../middleware/handleJoiValidator';
import { createUser } from '../schemas/users.schema';
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

export default router;
