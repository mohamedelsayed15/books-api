import { Request,Response,NextFunction } from "express"
import { storeQuery } from "../db/queries"
import { query } from "../db/connection"
import Store from "../models/store.model"

//const dbConnection = require("../db/connection")

exports.getStoreList = async (req:Request,res:Response) => {
    try {
        // const storeListQuery = storeQuery.GET_STORE_LIST

        // const storeList = await query(storeListQuery, null)

        let storeList:any = await Store.getStores()

        res.status(200).send(storeList.rows)

    } catch (e) {
        return res.status(500).send({
            error: "some error occurred, Please contact support"
        })
    }
}
exports.addStore = async (req: Request, res: Response) => {
    try {
        if (!req.body.storeName || !req.body.address) {
            console.log("ssss")
            return res.status(422).send({
                error: "Either storeName or address are required"
            })
        }

        const store = await  Store.create({
            name: req.body.storeName,
            address: req.body.address
        })

        res.status(201).send({ store })
    } catch (e) {
        console.log(e)
        res.status(500).send({e})
    }
}