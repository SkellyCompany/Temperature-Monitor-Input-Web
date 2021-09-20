import { LogType } from "./LogType";

export interface Log {
    type: LogType,
    name: string,
    description: string,
    parameters: Record<string, any>,
    sourceFile: string
}