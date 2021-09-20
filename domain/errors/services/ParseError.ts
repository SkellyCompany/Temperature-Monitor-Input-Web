import { ServiceError } from './ServiceError';

export class ParseError extends ServiceError {
    constructor(message: string) {
        super(message)
    }
}