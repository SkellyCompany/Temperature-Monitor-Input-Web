import { BaseError } from '../BaseError';

export class ServiceError extends BaseError {
    public getErrorMessage(): string {
        return this.message
    }
}