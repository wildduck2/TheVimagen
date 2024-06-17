import { prisma } from "../../prismaClient";


export const verifyOTP = async (userId: string, otp: string) => {
    const otpRecord = await prisma.otp.findFirst({
        where: {
            userId: userId,
            otp: otp,
            expiresAt: {
                gt: new Date(),
            },
        },
    });

    if (!otpRecord) {
        throw new Error('Invalid OTP or expired.');
    }

    //NOTE: Delete the OTP record after successful verification
    const deleteResult = await prisma.otp.delete({
        where: {
            id: otpRecord.id,
            otp
        },
    });

    return deleteResult
};
