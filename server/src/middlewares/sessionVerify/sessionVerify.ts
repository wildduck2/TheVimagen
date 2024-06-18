import { RequestHandler } from 'express';

export const sessionVerify: RequestHandler = (req, res, next) => {
    if (!req.session.user) {
        return res.json({ error: "you're not signed in" });
    }

    return next();
};
