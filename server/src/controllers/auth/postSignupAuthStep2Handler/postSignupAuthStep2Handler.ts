import { RequestHandler } from 'express';
import { User } from '../../../modles';

export const postSignupAuthStep2Handler: RequestHandler = async (req, res) => {
    try {
        const { otp, userId } = req.body;

        //NOTE: checking for the user is signed in
        if (userId !== req.session.user?.id)
            return res.json({ error: 'you are not signed in please signin' });

        //NOTE: checking for the OTP in the DB
        const OTP = await User.verifyOTP(userId, otp);
        if (!OTP) return res.json({ error: 'Wrong OTP code try again', otp: null });

        return res.json({ verified: true });
    } catch (error) {
        console.log(error);
        return res.json({ error: error });
    }
};
