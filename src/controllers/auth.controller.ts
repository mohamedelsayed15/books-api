import { Request,Response,NextFunction } from "express"
import User from "../models/user.model"
import jwt from "jsonwebtoken"
require('dotenv').config()
//logging and auditing
import { prepareAudit } from "../audit/audit.service"
import { auditAction } from "../audit/audit.action"
import Logger from "../services/logger.service"
const log = new Logger("store.controller")
//===================================

exports.login = async (req: Request, res: Response,next:NextFunction) => {
    try {
        //replace with validation
        if (!req.body.email || !req.body.password) {
            return res.status(422).send({
                error:"validation error"
            })
        }
        const user: any = await User.findByEmail(req.body.email)
        console.log(user)
        if (!user) {
            return res.status(404).json({
                error:"couldn't find the specified user"
            })
        }
        //replace with bcrypt compare
        if (req.body.password !== user.password) {
            return res.status(404).json({
                error:"couldn't find the specified user"
            })
        }
        user.password = ''
        const token = await jwt.sign(
            { user_id: user.user_id },
            process.env.JWT_SECRET !,
            { expiresIn: '7d' })
        
        
        res.json({
            user,token
        })

    } catch (err: any) {
        console.error(err)
        const error: any = new Error(err.message);
        log.error('updateBook', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'updateBook',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}