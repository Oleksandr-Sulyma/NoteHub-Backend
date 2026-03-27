import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  updateUserAvatar,
  updateUserName,
  getCurrentUser,
} from '../controllers/userController.js';
import { celebrate } from 'celebrate';
import { updateUserSchema } from '../validations/userValidation.js';

const router = Router();

router.get('/users/me', authenticate, getCurrentUser);
router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.patch(
  '/users/me/username',
  authenticate,
  celebrate(updateUserSchema),
  updateUserName,
);

export default router;
