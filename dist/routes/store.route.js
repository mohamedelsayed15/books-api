"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storeController = require("../controllers/store.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/store-list', storeController.getStoreList);
router.post('/create-store', storeController.addStore);
//404
router.use('/*', (req, res, next) => {
    return res.status(404).json({
        error: "couldn't find the specified route"
    });
});
exports.default = router;
