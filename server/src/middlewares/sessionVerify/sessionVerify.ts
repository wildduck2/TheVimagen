import { RequestHandler } from "express";

export const sessionVerify: RequestHandler = (req, res, next) => {

    if (!req.session.user) {
        res.json({ error: "you're not signed in" })
    }

    return next()
}
//
//     const session = req.session
//
//     // controllers/otpController.js
// const Otp = require('../models/otpModel');
//
// exports.verifyOtp = async (userId, otp) => {
//   const otpRecord = await Otp.findOne({ userId, otp, expiresAt: { $gt: Date.now() } });
//
//   if (!otpRecord) {
//     throw new Error('Invalid OTP or expired.');
//   }
//
//   // Delete the OTP record after successful verification
//   await otpRecord.deleteOne();
// };
//
// const { userId, otp } = req.body;
//   try {
//     await otpController.verifyOtp(userId, otp);
//     res.status(200).send('OTP verified');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
