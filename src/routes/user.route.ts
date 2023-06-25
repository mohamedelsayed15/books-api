const userController = require("../controllers/user.controller")
import { Router } from "express"
import { upload } from "../util/multer-user"
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

router.post(
    '/user-photo',
    upload,
    userController.userPic)

//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error:"couldn't find the specified route"
    })
})
export default router