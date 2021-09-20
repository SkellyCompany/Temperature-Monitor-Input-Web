export abstract class BaseError {
    message: string;

    constructor(message: string) {
        Error.apply(this, arguments);
        this.message = message
    }

    public abstract getErrorMessage(): string
}