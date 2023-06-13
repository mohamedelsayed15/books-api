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
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require('winston');
const dotenv = require('dotenv');
dotenv.config();
const dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
};
class LoggerService {
    constructor(route) {
        this.route = route;
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.printf((info) => {
                let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message}`;
                if (info.obj) {
                    message += ` data ${JSON.stringify(info.obj)} | `;
                }
                return message;
            }),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH}/${route}.log` }),
            ],
        });
        this.logger = logger;
    }
    info(message, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (obj) {
                this.logger.info(message, { obj });
            }
            else {
                this.logger.info(message);
            }
        });
    }
    error(message, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (obj) {
                this.logger.error(message, { obj });
            }
            else {
                this.logger.error(message);
            }
        });
    }
    debug(message, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (obj) {
                this.logger.debug(message, { obj });
            }
            else {
                this.logger.debug(message);
            }
        });
    }
}
exports.default = LoggerService;
