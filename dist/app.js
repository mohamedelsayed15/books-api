"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_route_1 = __importDefault(require("./routes/store.route"));
require('dotenv').config();
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json({ limit: "3kb" })); //parser//json data size limitation
app.use('/store', store_route_1.default);
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
});
