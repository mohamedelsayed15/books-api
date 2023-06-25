"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        //const directoryPath = await makeDirectory(UPC_ID)
        cb(null, `images/user-image`);
    }),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
        //cb(null, `productImageMulter-${UPC_ID}.${filemimeType}`);
    }
});
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)) {
        return cb(null, false); //reject
    }
    cb(null, true); //accept
};
exports.upload = (0, multer_1.default)({
    storage: fileStorage,
    fileFilter,
}).single('image');
