const winston = require('winston');
const dotenv = require('dotenv');
dotenv.config()

const dateFormat = () => {
return new Date(Date.now()).toLocaleString();
};

class LoggerService {
route: any;
logger: any;

constructor(route: any) {
    this.route = route;

    const logger = winston.createLogger({
    level: 'info',
    format: winston.format.printf((info: any) => {
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

async info(message: any, obj?: any) {
    if (obj) {
        this.logger.info(message, { obj });
    } else {
        this.logger.info(message);
    }
}

async error(message: any, obj?: any) {
    if (obj) {
        this.logger.error(message, { obj });
    } else {
        this.logger.error(message);
    }
}

async debug(message: any, obj?: any) {
    if (obj) {
        this.logger.debug(message, { obj });
    } else {
        this.logger.debug(message);
    }
}
}
export default LoggerService;
