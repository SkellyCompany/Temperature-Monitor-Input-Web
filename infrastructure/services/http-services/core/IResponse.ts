import { DTO } from '../../../../domain/dtos/interface/DTO.interface';
import { BaseError } from '../../../../domain/errors/BaseError';

export interface IResponse<T extends DTO | void> {
    status: ResponseStatus;
    data?: T;
    error?: BaseError;
}

export enum ResponseStatus {
    Success,
    Error
}
