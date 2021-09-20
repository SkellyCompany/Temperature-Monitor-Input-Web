import { GetServerSidePropsContext, NextPageContext } from 'next/types';
import Cookies from "universal-cookie";

class CookiesWrapper {
    private readonly basePath = "/"
    private readonly ctx: GetServerSidePropsContext

    constructor(ctx: GetServerSidePropsContext) {
        this.ctx = ctx
    }

    public save(key: string, value: string) {
        const cookies = new Cookies(this.ctx?.req ? this.ctx?.req?.headers.cookie : null);
        cookies.set(key, value, { path: this.basePath });
    }

    public remove(key: string) {
        const cookies = new Cookies(this.ctx?.req ? this.ctx?.req?.headers.cookie : null);
        cookies.remove(key, { path: this.basePath });
    }

    public retrieve(key: string): string {
        const cookies = new Cookies(this.ctx?.req ? this.ctx?.req?.headers.cookie : null);
        const value = cookies.get(key) || undefined;
        return value;
    }
}

export class CacheService {
    private readonly tokenKey: string = "token"

    private cookieWrapper: CookiesWrapper

    constructor(ctx: GetServerSidePropsContext = null) {
        this.cookieWrapper = new CookiesWrapper(ctx)
    }

    public saveToken(token: string) {
        this.cookieWrapper.save(this.tokenKey, token)
    }

    public retrieveToken(): string {
        return this.cookieWrapper.retrieve(this.tokenKey)
    }

    public removeToken() {
        this.cookieWrapper.remove(this.tokenKey)
    }
}
