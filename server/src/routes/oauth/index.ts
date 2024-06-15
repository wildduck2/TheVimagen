
import { Router } from "express";
import { getAuthLogin } from "../../controlers";

const oauthRouter = Router()

// authRouter.post('/auth/login', getAuthLogin)
oauthRouter.get('/auth/login', getAuthLogin)


export { oauthRouter }
