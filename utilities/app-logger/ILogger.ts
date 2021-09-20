import { Log } from './models/Log';

export interface ILogger {
    log(log: Log): void
}