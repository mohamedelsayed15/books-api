"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const export_controller_1 = __importDefault(require("../controllers/export.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/books', export_controller_1.default.books);
//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error: "couldn't find the specified route"
    });
});
exports.default = router;
