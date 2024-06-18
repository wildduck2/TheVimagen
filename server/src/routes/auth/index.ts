import { Router } from 'express';
import {
    postSigninAuthHandler,
    postSignupAuthStep1Handler,
    postSignupAuthStep2Handler,
    userNameExist,
} from '../../controllers';
import { sessionVerify } from '../../middlewares';

const authRouter = Router();

authRouter.post('/auth/signin-email', postSigninAuthHandler);
authRouter.post('/auth/signup-email-step1', postSignupAuthStep1Handler);
authRouter.post(
    '/auth/signup-email-step2',
    sessionVerify,
    postSignupAuthStep2Handler
);
authRouter.post('/auth/userNameExist', userNameExist)

export { authRouter };
