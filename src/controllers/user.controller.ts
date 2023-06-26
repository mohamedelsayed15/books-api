import { Request,Response,NextFunction } from "express"
import User from "../models/user.model"

//logging and auditing
import { prepareAudit } from "../audit/audit.service"
import { auditAction } from "../audit/audit.action"
import Logger from "../services/logger.service"
const log = new Logger("store.controller")
//===================================

exports.createUser = async (req: Request, res: Response,next:NextFunction) => {
    try {//replace with validation
        if (!req.body.username ||
            !req.body.email ||
            !req.body.password ) {
            return res.status(422).json({
                error: "Either storeName or address are required"
            })
        }
        const findUser = await User.findByEmail(req.body.email)

        if (findUser) {
            console.log('user : ',findUser)
            return res.status(409).json({
                error: "a user with this email already signed up"
            })
        }
        //hash the password before saving

        const user = await  User.create({
            username:req.body.username ,
            email:req.body.email ,
            password: req.body.password,
            userType: 'customer'
        })

        res.status(201).json(user)
    }  catch (err:any) {
        console.error('An error occurred', err);
        const error: any = new Error(err.message);
        log.error('addBook', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'addBook',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}
exports.getUsersList = async (req:Request,res:Response,next:NextFunction) => {
    try {
        let usersList = await User.getUsersList()
        res.status(200).json({ usersList })

    }  catch (err:any) {
        console.error('An error occurred', err)
        const error: any = new Error(err.message)
        log.error('getUsersList', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'getUsersList',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error)
    }
}
exports.findUserById = async (req:any,res:Response,next:NextFunction) => {
    try {//replace with validation
        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                error: "couldn't find specified book"
            })
        }
        res.status(200).json(user)

    } catch (err:any) {
        console.error('An error occurred', err)
        const error: any = new Error(err.message)
        log.error('findUserById', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'findUserById',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}
exports.userPic = async (req:any,res:Response,next:NextFunction) => {
    try {

        if (!req.file) {
            return res.status(422).json({
                error: "Please, Provide a photo"
            })
        }
        // store the file into the database
        console.log(req.file.path)

        res.send('uploaded');

    } catch (err:any) {
        console.error('An error occurred', err)
        const error: any = new Error(err.message)
        log.error('findUserById', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'findUserById',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}