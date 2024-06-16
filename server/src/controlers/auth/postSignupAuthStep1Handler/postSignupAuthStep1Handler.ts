import { RequestHandler } from "express"
import bcrypt from 'bcrypt'
import { prisma } from "../../../prismaClient"
import { Email, KoalaWelcomeEmail, renderEmail } from "../../../veiws"
import { mailOptions, transporter } from "../../../utils/nodeMailer"

export const postSignupAuthStep1Handler: RequestHandler = async (req, res) => {

    try {
        const { password, email, userName } = req.body
        console.log(req.body)
        //NOTE: checking for the user existence in out DB
        const userDoExist = await prisma.user.findUnique({ where: { email } })
        if (userDoExist) {
            return res.json({ error: "user do exist" })
            await prisma.session.update({ where: { id: req.session.id }, data: { userId: userDoExist?.id } })
        }

        //NOTE: Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);


        // NOTE: Create a new user in the database
        const user = await prisma.user.create({
            data: {
                userName,
                password: hashedPassword,
                email,
            }
        })

        console.log(req.session.id, 'dsfsdfsdfsfsdf')

        const emailHtml = renderEmail(KoalaWelcomeEmail, { userFirstname: userName });

        transporter.sendMail(mailOptions(email, 'sdfsdfsdf', emailHtml), (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.send('Email sent: ' + info.response);
            return res.json({ user })
        });

    } catch (error) {
        console.log(error)
        return res.json({ error: error })
    }

    return res.json({ hi: "hi ", session: req.session })
}
