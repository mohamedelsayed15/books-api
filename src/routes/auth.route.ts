const authController = require("../controllers/auth.controller")
import { Router } from "express"

const router = Router()
router.post(
    '/login',
    authController.login)

//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error:"couldn't find the specified route"
    })
})
export default router