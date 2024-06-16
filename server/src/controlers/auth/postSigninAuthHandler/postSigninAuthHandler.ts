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

        const session = await prisma.session.update({
            where:
                { id: req.session.id }, data: { userId: user.id }
        })

        console.log(session)

        return res.json({ user: user, session: req.session })
    } catch (error) {
        console.log(error)
        return res.json({ error: error })
    }
}
