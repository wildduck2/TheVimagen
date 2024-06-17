import { RequestHandler } from "express"
import bcrypt from 'bcrypt'
import { prisma } from "../../../prismaClient"
import { KoalaWelcomeEmail, renderEmail } from "../../../veiws"
import { generateOTP, zodCredentialsValidation } from "../../../utils"
import { z } from "zod"

export const postSignupAuthStep1Handler: RequestHandler = async (req, res) => {

    try {
        const { password, email, userName } = req.body

        //NOTE: Zod data validation
        const { validEmail, validPassword } = await zodCredentialsValidation({ email, password })

        //NOTE: checking for the user existence in out DB
        const userDoExist = await prisma.user.findFirst({
            where: {
                AND: [
                    { email: validEmail },
                    { userName: userName }
                ]
            }
        });

        console.log(userDoExist)
        if (userDoExist) {
            return res.json({ error: "user do exist" })
            await prisma.session.update({ where: { sid: req.session.id }, data: { userId: userDoExist?.id } })
        }

        //NOTE: Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(validPassword, 10);

        // NOTE: Create a new user in the database
        const user = await prisma.user.create({
            data: {
                userName,
                password: hashedPassword,
                email,
                sessions: {
                    create: {
                        sid: req.sessionID,
                        expiresAt: req.session.cookie.expires!,
                        data: JSON.stringify(req.session)
                    }
                }
            }
        })
        if (!user) return res.json({ error: "user hasn't created" })

        //NOTE: genrating the OTP and create DB field with it
        const { otp } = await generateOTP(user.id)

        //NOTE: Rendering the Coponent and send the Email
        const emailHtml = renderEmail(KoalaWelcomeEmail, {
            code: otp, type: "comfirmEmail"
        });

        req.session.otp = otp
        req.session.user = user



        // transporter.sendMail(mailOptions(email, 'Welcome to TheVimeagen', emailHtml), (error, info) => {
        //     if (error) {
        //         return res.status(500).send(error.toString());
        //     }
        //     res.send('Email sent: ' + info.response);
        //     return res.send("email sent okay")
        // });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(401).json({ error: "Unvalid Credintial (email 0r password)!", user: null })
        }
        console.log(error)
        return res.json({ error: error })
    }

    return res.json({ hi: "hi ", session: req.session })
}
