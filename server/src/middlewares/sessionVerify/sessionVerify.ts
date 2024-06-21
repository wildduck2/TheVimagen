import { RequestHandler } from 'express'
import requestIp from 'request-ip'

export const sessionVerify: RequestHandler = (req, res, next) => {
    // if (!req.sessionID) {
    //     return res.json({ error: "you're not signed in" })
    // }

    const clientIp = requestIp.getClientIp(req)
    if (clientIp === '10.240.0.69') {
        console.log('i got you fucker')
        return res.json({ error: 'i got you fucker' })
    }
    console.log(clientIp, 'this is the real ip addread of you asshole')

    return next()
}
