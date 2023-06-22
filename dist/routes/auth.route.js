"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController = require("../controllers/auth.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/login', authController.login);
//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error: "couldn't find the specified route"
    });
});
exports.default = router;
