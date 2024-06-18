import { RequestHandler } from 'express';
import { z } from 'zod';
import { User } from '../../../modles';
import { prisma } from '../../../utils';

export const postSignupAuthStep1Handler: RequestHandler = async (req, res) => {
    try {
        const { password, email, userName } = req.body;

        //NOTE: Zod data validation
        const { validEmail, validPassword } = await User.zodCredentialsValidation({
            email,
            password,
        });

        //NOTE: checking for the user existence in out DB
        const userDoExist = await User.checkUserExistInDb({ validEmail, userName });

        if (userDoExist) {
            return res.json({ error: 'user do exist' });
            await prisma.session.update({
                where: { sid: req.session.id },
                data: { userId: userDoExist?.id },
            });
        }

        const user = await User.createNewUser({
            validEmail,
            userName,
            validPassword,
            sessionId: req.session.id,
            expiresAt: req.session.cookie.expires!,
            session: req.session,
        });

        //NOTE: Hash the password before saving it to the database
        if (!user) return res.json({ error: "user hasn't created" });

        //NOTE: genrating the OTP and create DB field with it
        const { otp } = await User.generateOTP({ userId: user.id });

        req.session.otp = otp;
        req.session.user = user;

        //NOTE: Rendering the Coponent and send the Email
        await User.sendEmail({
            otp,
            title: 'Verify your account at TheVimeagen',
            email,
            cb: (error, info) => {
                if (error) {
                    return res.status(500).send(error.toString());
                }
                res.send('Email sent: ' + info.response);
                return res.send('email sent okay');
            },
        });

        return res.json({ user: user, error: null });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(401)
                .json({ error: 'Unvalid Credintial (email 0r password)!', user: null });
        }
        console.log(error);
        return res.json({ error: error });
    }
};
