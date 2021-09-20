import { Log } from '../models/Log';
import { LogType } from '../models/LogType';
import { ILogger } from '../ILogger';

export class ConsoleLogger implements ILogger {
    log(log: Log): void {
        const spacer = "------------------------------------------------------------------------------------"
        var consoleMessage: string = spacer + "\n"
        var logName: string
        switch (log.type) {
            case LogType.SUCCESS: {
                logName = "✅  - " + log.name + "\n\n"
                break;
            }
            case LogType.INFO: {
                logName = "📢  - " + log.name + "\n\n"
                break;
            }
            case LogType.WARNING: {
                logName = "🟡 - " + log.name + "\n\n"
                break;
            }
            case LogType.ERROR: {
                logName = "⛔️ - " + log.name + "\n\n"
                break;
            }
        }
        consoleMessage += logName

        if (log.description || log.parameters) {
            consoleMessage += "🔖 Details" + "\n\n"
        }
        if (log.description) {
            consoleMessage += "     🖋 Description: " + log.description + "\n\n"
        }
        if (log.parameters) {
            consoleMessage += "     📎 Parameters: " + JSON.stringify(log.parameters) + "\n\n"
        }
        consoleMessage += "🔎 Source\n\n"
        consoleMessage += "     🗂 File - " + log.sourceFile + "\n\n"
        consoleMessage += spacer
        console.log(consoleMessage)
    }
}
