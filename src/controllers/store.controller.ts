import { Request,Response,NextFunction } from "express"
import { storeQuery } from "../db/queries"
import { query } from "../db/connection"
import Store from "../models/store.model"
import { request } from "http"
//const dbConnection = require("../db/connection")

exports.getStoreList = async (req:Request,res:Response) => {
    try {
        const storeListQuery = storeQuery.GET_STORE_LIST

        const storeList = await query(storeListQuery, null)

        res.status(200).send(storeList)

    } catch (e) {
        return res.status(500).send({
            error: "some error occurred, Please contact support"
        })
    }
}
exports.addStore = async (req: Request, res: Response) => {
    try {

        if (!req.body.storeName || !req.body.address || !req.body.code ) {
            return res.status(422).send({
                error: "Either storeName or address are required"
            })
        }

        const store = new Store({
            name: req.body.storeName,
            address: req.body.address,
            code :req.body.code
        })
        const addStoreQuery = storeQuery.ADD_STORE

        const storeList = await query(addStoreQuery,null )
    } catch (e) {
        
    }
}