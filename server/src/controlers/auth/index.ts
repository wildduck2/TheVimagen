import { RequestHandler } from 'express';
// import { prisma } from '../../prismaClient'

export async function getUserData(access_token: string) {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

    //console.log('response',response);
    const data = await response.json();
    console.log('data', data);
}



export const postSignupAuthHandler: RequestHandler = (req, res) => {

    res.json({ hi: 'sdfkl' })
    // const { firstName, lastName, userName, password, email } = res.body
    //
    //
    // const user = prisma.user.create({
    //     data: {
    //         firstName,
    //         lastName,
    //         userName,
    //         password,
    //         email
    //     }
    // })
}

export const postSignupAuthStep1Handler: RequestHandler = (req, res) => {
    res.json({ hi: 'welcom' })
}
