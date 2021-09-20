import { DTO } from '../../../../domain/dtos/interface/DTO.interface';
import { CacheService } from '../../../cache/Cache.service';
import { GetServerSidePropsContext, NextPageContext } from "next";
import { ParseError } from "../../../../domain/errors/services/ParseError";
import { IResponse, ResponseStatus } from "./IResponse";
import { InvalidTokenError } from "../../../../domain/errors/services/InvalidTokenError";
import { IEntity } from '../../../../domain/entities/interface/IEntity';
import { TokenHelper } from '../../../../utilities/helpers/Token.helper';
import HttpClient from '../../../clients/http-client/HttpClient';

export enum AuthorizationType {
    NONE, AUTHORIZE
}

export enum ResponseType {
    VOID, SINGLE, ARRAY
}

export class HttpService {
    private readonly cacheService: CacheService;

    constructor(ctx: GetServerSidePropsContext = null) {
        this.cacheService = new CacheService(ctx);
    }

    public async get<T extends DTO, E extends IEntity>(
        url: string,
        authorization: AuthorizationType = AuthorizationType.NONE,
        responseType: ResponseType = ResponseType.VOID,
        entityType: { new(): E },
    ): Promise<IResponse<E | E[] | void>> {
        if (authorization === AuthorizationType.NONE) {
            return this.getWithToken<T, E>(url, undefined, entityType, responseType);
        } else {
            if (TokenHelper.validateToken(this.cacheService.retrieveToken())) {
                return this.getWithToken<T, E>(
                    url,
                    this.cacheService.retrieveToken(),
                    entityType,
                    responseType
                ) as Promise<IResponse<E>>;
            } else {
                let response: IResponse<E> = {
                    status: ResponseStatus.Error,
                    data: undefined,
                    error: new InvalidTokenError(),
                };
                return response;
            }
        }
    }

    private async getWithToken<T extends DTO, E extends IEntity>(
        url: string,
        token: string,
        entityType: { new(): E },
        responseType: ResponseType
    ): Promise<IResponse<E | E[] | void>> {
        const client = new HttpClient();
        return client
            .get(url, token)
            .then((res) => {
                return this.constructResponseFromFetchedData<T, E>(res, entityType, responseType)
            })
            .catch((error) => {
                const response: IResponse<E> = {
                    status: ResponseStatus.Error,
                    data: undefined,
                    error: error,
                };
                return response;
            });
    }

    public async post<T extends DTO, E extends IEntity>(
        url: string,
        data: any,
        authorization: AuthorizationType = AuthorizationType.NONE,
        responseType: ResponseType = ResponseType.VOID,
        entityType?: { new(): E }
    ): Promise<IResponse<E | E[] | void>> {
        if (authorization === AuthorizationType.NONE) {
            return this.postWithToken<T, E>(url, data, undefined, entityType, responseType);
        } else {
            if (TokenHelper.validateToken(this.cacheService.retrieveToken(),)) {
                return this.postWithToken<T, E>(
                    url,
                    data,
                    this.cacheService.retrieveToken(),
                    entityType,
                    responseType
                ) as Promise<IResponse<E>>;
            } else {
                let response: IResponse<E> = {
                    status: ResponseStatus.Error,
                    data: undefined,
                    error: new InvalidTokenError(),
                };
                return response;
            }
        }
    }

    private async postWithToken<T extends DTO, E extends IEntity>(
        url: string,
        data: any,
        token: string,
        entityType: { new(): E },
        responseType: ResponseType
    ): Promise<IResponse<void | E | E[]>> {
        const client = new HttpClient();
        return client
            .post(url, data, token)
            .then((res) => {
                return this.constructResponseFromFetchedData<T, E>(res, entityType, responseType);
            })
            .catch((error) => {
                const response: IResponse<E> = {
                    status: ResponseStatus.Error,
                    data: undefined,
                    error: error,
                };
                return response;
            });
    }

    public async put<T extends DTO, E extends IEntity>(
        url: string,
        data: any,
        authorization: AuthorizationType = AuthorizationType.NONE,
        responseType: ResponseType = ResponseType.VOID,
        entityType?: { new(): E },
    ): Promise<IResponse<E | E[] | void>> {
        if (authorization === AuthorizationType.NONE) {
            return this.putWithToken<T, E>(url, data, undefined, entityType, responseType);
        } else {
            if (TokenHelper.validateToken(this.cacheService.retrieveToken(),)) {
                return this.putWithToken<T, E>(
                    url,
                    data,
                    this.cacheService.retrieveToken(),
                    entityType,
                    responseType
                ) as Promise<IResponse<E>>;
            } else {
                let response: IResponse<E> = {
                    status: ResponseStatus.Error,
                    data: undefined,
                    error: new InvalidTokenError(),
                };
                return response;
            }

        }
    }

    private async putWithToken<T extends DTO, E extends IEntity>(
        url: string,
        data: any,
        token: string,
        entityType: { new(): E },
        responseType: ResponseType
    ): Promise<IResponse<void | E | E[]>> {
        const client = new HttpClient();
        return client
            .put(url, data, token)
            .then((res) => {
                return this.constructResponseFromFetchedData<T, E>(res, entityType, responseType);
            })
            .catch((error) => {
                const response: IResponse<E> = {
                    status: ResponseStatus.Error,
                    data: undefined,
                    error: error,
                };
                return response;
            });
    }

    public async delete<T extends DTO, E extends IEntity>(
        url: string,
        data: any,
        authorization: AuthorizationType = AuthorizationType.NONE,
        responseType: ResponseType = ResponseType.VOID,
        entityType?: { new(): E }
    ): Promise<IResponse<E | E[] | void>> {
        if (authorization === AuthorizationType.NONE) {
            return this.deleteWithToken<T, E>(url, data, undefined, entityType, responseType);
        } else {
            if (TokenHelper.validateToken(this.cacheService.retrieveToken(),)) {
                return this.deleteWithToken<T, E>(
                    url,
                    data,
                    this.cacheService.retrieveToken(),
                    entityType,
                    responseType
                ) as Promise<IResponse<E>>;
            } else {
                let response: IResponse<E> = {
                    status: ResponseStatus.Error,
                    data: undefined,
                    error: new InvalidTokenError(),
                };
                return response;
            }
        }
    }

    private async deleteWithToken<T extends DTO, E extends IEntity>(
        url: string,
        data: any,
        token: string,
        entityType: { new(): E },
        responseType: ResponseType
    ): Promise<IResponse<void | E | E[]>> {
        const client = new HttpClient();
        return client
            .delete(url, data, token)
            .then((res) => {
                return this.constructResponseFromFetchedData<T, E>(res, entityType, responseType);
            })
            .catch((error) => {
                const response: IResponse<E> = {
                    status: ResponseStatus.Error,
                    data: undefined,
                    error: error,
                };
                return response;
            });
    }

    private constructResponseFromFetchedData<T extends DTO, E extends IEntity>(
        fetchedData: any,
        type: { new(): E },
        responseType: ResponseType
    ): IResponse<E | E[] | void> {
        try {
            const entity = this.constructEntityFromFetchedData<T, E>(fetchedData, type, responseType);
            if (responseType === ResponseType.SINGLE) {
                return {
                    status: ResponseStatus.Success,
                    data: entity as E,
                    error: undefined
                }
            } else {
                return {
                    status: ResponseStatus.Success,
                    data: entity as E[],
                    error: undefined
                }
            }
        } catch (error) {
            return {
                status: ResponseStatus.Error,
                data: undefined,
                error: error
            }
        }
    }

    private constructEntityFromFetchedData<T extends DTO, E extends IEntity>(
        fetchedData: any,
        type: { new(): E },
        responseType: ResponseType
    ): E | E[] {
        if (responseType === ResponseType.VOID) {
            return undefined
        } else if (responseType === ResponseType.SINGLE) {
            const fetchable: T = fetchedData
            if (fetchable) {
                const entity = new type();
                return entity.construct(fetchable);
            }
            throw new ParseError("Could not parse the response.")
        } else {
            const fetchable: T[] = fetchedData
            if (fetchable) {
                const entities: E[] = [];
                fetchable.forEach((object) => {
                    const entity = new type();
                    entity.construct(object);
                    entities.push(entity);
                });
                return entities
            }
            throw new ParseError("Could not parse the response.")
        }
    }
}
