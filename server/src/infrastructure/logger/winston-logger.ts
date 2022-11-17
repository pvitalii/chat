import winston from "winston";
import { ILogger } from "../interfaces/logger.interface";

export class WinstonLogger implements ILogger {
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.simple(),
        transports: [
            new winston.transports.Console()
        ],
    });

    log(level: string, message: string): void {
        this.logger.log(level, message)
    }
}


