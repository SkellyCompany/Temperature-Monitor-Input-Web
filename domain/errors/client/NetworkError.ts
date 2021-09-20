import { ClientError } from './ClientError';

export class NetworkError extends ClientError {
    constructor(message: string) {
        super(message)
    }
}