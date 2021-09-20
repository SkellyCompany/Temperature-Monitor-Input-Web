import { BaseError } from '../BaseError';

export class ClientError extends BaseError {
    constructor(message: string) {
        super(message)
    }

    getErrorMessage(): string {
        return this.message
    }
}