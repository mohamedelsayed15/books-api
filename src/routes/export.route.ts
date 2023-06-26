import exportController from "../controllers/export.controller"
import { Router } from "express"

const router = Router()

router.get(
    '/books',
    exportController.books)

//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error:"couldn't find the specified route"
    })
})
export default router