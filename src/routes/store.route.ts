const storeController = require("../controllers/store.controller")
import { Router } from "express"

const router = Router()

router.get(
    '/store-list',
    storeController.getStoreList)

router.post(
    '/create-store',
    storeController.addStore)

//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error:"couldn't find the specified route"
    })
})
export default router