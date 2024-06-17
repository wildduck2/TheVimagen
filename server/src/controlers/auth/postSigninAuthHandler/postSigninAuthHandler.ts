import { RequestHandler } from "express";
import bcrypt from 'bcrypt'
import { prisma } from "../../../prismaClient";

export const postSigninAuthHandler: RequestHandler = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'unvalid Credintial' })
        }


        //NOTE: checking for any session realated to this user and it's valid not expired
        const sessionDoExist = await prisma.session.findUnique({ where: { sid: req.session.id } })
        if (!sessionDoExist) {
            await prisma.session.create({
                data: {
                    sid: req.session.id,
                    userId: user.id,
                    expiresAt: req.session.cookie.expires!,
                    data: JSON.stringify(req.session),
                }
            })
        }


        req.session.user = user
        return res.json({ user: user, session: req.session })
    } catch (error) {
        console.log(error)
        return res.json({ error: error })
    }
}
