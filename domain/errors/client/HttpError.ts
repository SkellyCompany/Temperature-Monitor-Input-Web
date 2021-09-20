import { ClientError } from "./ClientError";

export class HttpError extends ClientError {
    statusCode: number;
    backendMessage: string

    constructor(statusCode: number, message: string, backendMessage: string) {
        super(message)
        this.statusCode = statusCode
        this.backendMessage = backendMessage
    }

    getErrorMessage(): string {
        return this.message + "\n\n" + this.backendMessage
    }
}