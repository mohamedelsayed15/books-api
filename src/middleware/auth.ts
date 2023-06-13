const jwt = require('jsonwebtoken')
import { Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'


export const auth = async (req:any, res:Response, next:NextFunction) => {
    try {
        let headerToken: string|undefined = req.header('Authorization')
        if (!headerToken || !headerToken.startsWith('Bearer ')){
            return res.status(422).send({
                error:"the request is missing bearer token"
            })
        } else {
            headerToken = headerToken.replace('Bearer ', '')
        }
        //custom function (promise)
        const decoded: any = await jwtVerify(headerToken)

        req.id = decoded.id

        next()
    } catch (e) {
    }
}
const jwtVerify = (headerToken:string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            headerToken,
            process.env.JWT_SECRET,
            (err: Error, decoded: JwtPayload) => {
                if(decoded) {
                    resolve(decoded)
                }
                if (err) {
                    reject(err)
                }
            })
        })
    }