const storeController = require("../controllers/store.controller")
import { Router } from "express"

const router = Router()

router.get(
    '/store-list',
    storeController.getStoreList)

router.post(
    '/create-store',
    storeController.addStore)


export default router