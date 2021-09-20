import { LogRecipient } from './models/LogRecipient';
import { ToastLogger } from './loggers/ToastLogger';
import { FirebaseAnalyticsLogger } from './loggers/FirebaseAnalyticsLogger';
import { ILogger } from './ILogger';
import { Log } from './models/Log';
import { LogType } from './models/LogType';
import { ConsoleLogger } from './loggers/ConsoleLogger';
import SystemInfo from '../../global/SystemInfo';

export class AppLogger {
    loggers: ILogger[]

    constructor() {
        this.loggers = [new ConsoleLogger(), new FirebaseAnalyticsLogger(), new ToastLogger()]
    }

    public log(type: LogType, recipient: LogRecipient, name: string, description: string = undefined, parameters: Record<string, any> = undefined, stack: string = new Error().stack) {
        const sourceFile = this.extractSourceFile(stack)
        const log: Log = {
            type: type,
            name: name,
            description: description,
            parameters: parameters,
            sourceFile: sourceFile
        }
        this.loggers.forEach(logger => {
            if (SystemInfo.isProduction()) {
                if (logger instanceof ConsoleLogger || logger instanceof ToastLogger) {
                    if (recipient === LogRecipient.USER) {
                        logger.log(log)
                    }
                } else {
                    logger.log(log)
                }
            } else {
                logger.log(log)
            }
        })
    }

    public devLog(name: string, description: string = undefined, parameters: Record<string, any> = undefined, stack: string = new Error().stack) {
        const sourceFile = this.extractSourceFile(stack)
        const log: Log = {
            type: LogType.INFO,
            name: name,
            description: description,
            parameters: parameters,
            sourceFile: sourceFile
        }
        this.loggers.forEach(logger => {
            if (!SystemInfo.isProduction()) {
                if (logger instanceof ConsoleLogger || logger instanceof ToastLogger) {
                    logger.log(log)
                }
            }
        })
    }


    private extractSourceFile(stack: string): string {
        if (stack) {
            const stackArray = stack.split("\n")
            if (stackArray && stackArray.length !== 0) {
                const sourceUnformattedString = stackArray[stackArray.length - 1]
                if (sourceUnformattedString && sourceUnformattedString.length !== 0) {
                    const sourceArray = sourceUnformattedString.split(" ")
                    if (sourceArray && sourceArray.length !== 0) {
                        const sourceString = sourceArray[sourceArray.length - 1]
                        if (sourceString && sourceString.length !== 0) {
                            const fileAbsoluteArray = sourceString.split("./")
                            if (fileAbsoluteArray && fileAbsoluteArray.length !== 0) {
                                const fileUnformattedString = fileAbsoluteArray[fileAbsoluteArray.length - 1]
                                if (fileUnformattedString && fileUnformattedString.length !== 0) {
                                    const sourceFile = fileUnformattedString.split(":")[0]
                                    if (sourceFile && sourceFile.length !== 0) {
                                        return sourceFile
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return "Unknown"
        }
    }
}
