import { RequestHandler } from 'express';
import { prisma } from '../../prismaClient';

export async function getUserData(access_token: string) {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

    //console.log('response',response);
    const data = await response.json();
    console.log('data', data);
}

export const postSignupAuthHandler: RequestHandler = async (req, res) => {
    const { password, email, userName } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                userName,
                password,
                email,
            }
        })

        if (!user) return res.json({ user })


        return res.json({ user })

    } catch (error) {
        console.log(error)
        return res.json({ error: error })
    }
}

export * from './postSigninAuthHandler'
export * from './postSignupAuthStep1Handler'
export * from './postSignupAuthStep2Handler'
