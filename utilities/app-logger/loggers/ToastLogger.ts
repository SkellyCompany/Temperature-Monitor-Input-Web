import { toast } from 'react-toastify';
import { Log } from '../models/Log';
import { LogType } from '../models/LogType';
import { ILogger } from '../ILogger';

export class ToastLogger implements ILogger {
    log(log: Log): void {
        switch (log.type) {
            case LogType.SUCCESS: {
                if (log.description) {
                    toast.success("✅   " + log.name + "\n\n" + log.description)
                    break;
                } else {
                    toast.success("✅   " + log.name)
                    break;
                }
            }
            case LogType.INFO: {
                if (log.description) {
                    toast.info("📢   " + log.name + "\n\n" + log.description)
                    break;
                } else {
                    toast.info("📢   " + log.name)
                    break;
                }
            }
            case LogType.WARNING: {
                if (log.description) {
                    toast.warn("🟡   " + log.name + "\n\n" + log.description)
                    break;
                } else {
                    toast.warn("🟡   " + log.name)
                    break;
                }
            }
            case LogType.ERROR: {
                if (log.description) {
                    toast.error("⛔️   " + log.name + "\n\n" + log.description)
                    break;
                } else {
                    toast.error("⛔️   " + log.name)
                    break;
                }
            }
        }
    }
}
