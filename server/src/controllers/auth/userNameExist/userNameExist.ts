import { RequestHandler } from "express";
import { z } from "zod";

export const userNameExist: RequestHandler = (req, res) => {
    const { userName } = req.body

    const userNameSchema = z.string().min(6).max(30)

    try {
        userNameSchema.parse(userName)

        res.json({ user: req.session.user, error: null, valid: true })
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.json({ user: null, error: error, valid: false })
        }
    }
}
