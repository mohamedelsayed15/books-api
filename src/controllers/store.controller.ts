import { Request,Response,NextFunction } from "express"
import Store from "../models/store.model"

//logging and auditing
import { prepareAudit } from "../audit/audit.service"
import { auditAction } from "../audit/audit.action"
import Logger from "../services/logger.service"
const log = new Logger("store.controller")
//===================================

exports.addStore = async (req: Request, res: Response,next:NextFunction) => {
    try {

        if (!req.body.storeName || !req.body.address) {
            return res.status(422).json({
                error: "Either storeName or address are required"
            })
        }

        const store = await  Store.create({
            name: req.body.storeName,
            address: req.body.address
        })

        res.status(201).json({ store })
    }catch (err: any) {
        console.error(err)
        const error: any = new Error(err.message);
        log.error('addStore', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'addStore',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}
exports.getStoreList = async (req:Request,res:Response,next:NextFunction) => {
    try {

        let storesList = await Store.getStores()

        res.status(200).json({storesList})

    }catch (err: any) {
        console.error(err)
        const error: any = new Error(err.message);
        log.error('getStoreList', error.toString())
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'getStoreList',
            data:null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn:new Date(Date.now()).toLocaleString(),
        }
        return next(error);
    }
}
