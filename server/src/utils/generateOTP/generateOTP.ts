import otpGenerator from "otp-generator";
import { prisma } from "../../prismaClient";

export const generateOTP = async (userId: string): Promise<{ otp: string, expiresAt: Date }> => {
    try {
        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const expiresAt = new Date(Date.now() + 60000 * 10); // Expires after 10 minutes

        const tp = await prisma.otp.create({
            data: {
                userId,
                otp: OTP,
                expiresAt
            }
        });

        if (!tp) return { otp: OTP, expiresAt };

        return { otp: OTP, expiresAt };
    } catch (error) {
        console.error(error);
        throw new Error("Error occurred during OTP generation.");
    }
};

