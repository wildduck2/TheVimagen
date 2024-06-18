import { Router } from 'express';
import { getAuthLogin } from '../../controllers';

const oauthRouter = Router();

// authRouter.post('/auth/login', getAuthLogin)
oauthRouter.get('/auth/login', getAuthLogin);

export { oauthRouter };
