"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController = require("../controllers/user.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.put('/create-user', userController.createUser);
router.get('/users-list', userController.getUsersList);
router.get('/find-user/:id', userController.findUserById);
//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error: "couldn't find the specified route"
    });
});
exports.default = router;
