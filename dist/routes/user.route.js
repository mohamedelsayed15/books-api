"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController = require("../controllers/user.controller");
const express_1 = require("express");
const multer_user_1 = require("../util/multer-user");
const router = (0, express_1.Router)();
router.put('/create-user', userController.createUser);
router.get('/users-list', userController.getUsersList);
router.get('/find-user/:id', userController.findUserById);
router.post('/user-photo', multer_user_1.upload, userController.userPic);
//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error: "couldn't find the specified route"
    });
});
exports.default = router;
