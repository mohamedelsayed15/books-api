import { Request,Response,NextFunction } from "express"
import Store from "../models/store.model"

exports.addStore = async (req: Request, res: Response) => {
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
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}
exports.getStoreList = async (req:Request,res:Response) => {
    try {

        let storesList = await Store.getStores()

        res.status(200).json({storesList})

    } catch (e) {
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        })
    }
}
