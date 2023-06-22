const userController = require("../controllers/user.controller")
import { Router } from "express"

const router = Router()
router.put(
    '/create-user',
    userController.createUser)

router.get(
    '/users-list',
    userController.getUsersList)

router.get(
    '/find-user/:id',
    userController.findUserById)

//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error:"couldn't find the specified route"
    })
})
export default router