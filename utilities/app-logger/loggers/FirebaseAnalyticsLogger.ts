import { getAnalytics } from 'firebase/analytics';
import { logEvent } from 'firebase/analytics';
import { Log } from '../models/Log';
import { ILogger } from '../ILogger';
import { analytics } from '../../../firebase.config'

export class FirebaseAnalyticsLogger implements ILogger {
    log(log: Log): void {
        logEvent(analytics, log.name, log.parameters);
    }
}
