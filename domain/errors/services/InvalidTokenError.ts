import { ServiceError } from './ServiceError';

export class InvalidTokenError extends ServiceError {
    constructor() {
        super("Token is invalid.")
    }
}