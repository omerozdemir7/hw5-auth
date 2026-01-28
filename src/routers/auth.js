import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js'; // Hata yakalayıcı wrapper'ınız
import { validateBody } from '../middlewares/validateBody.js'; // Joi validasyon middleware'iniz
import { 
  registerUserSchema, 
  loginUserSchema 
} from '../validation/auth.js'; // Joi şemaları (sizin oluşturmanız gerekecek)
import { 
  registerUserController, 
  loginUserController, 
  logoutUserController, 
  refreshUserSessionController 
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/refresh',
  ctrlWrapper(refreshUserSessionController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController),
);

export default router;