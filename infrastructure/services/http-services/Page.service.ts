import { GetServerSidePropsContext } from "next";
import { IPageDTO } from '../../../domain/dtos/IPageDTO';
import { Page } from '../../../domain/entities/Page';
import { AuthorizationType, HttpService, ResponseType } from './core/Http.service';
import { IResponse } from './core/IResponse';

class PageService {
  private readonly pageUrl: string = "/page";
  private readonly pageBySourceUrl: string = "/page/source";

  private readonly service: HttpService;

  constructor(ctx: GetServerSidePropsContext = null) {
    this.service = new HttpService(ctx);
  }

  public async fetchAllPages(): Promise<IResponse<Page[]>> {
    return this.service.get<IPageDTO, Page>(
      this.pageUrl,
      AuthorizationType.AUTHORIZE,
      ResponseType.ARRAY,
      Page
    ) as Promise<IResponse<Page[]>>;
  }

  public async fetchPage(id: string): Promise<IResponse<Page>> {
    return this.service.get<IPageDTO, Page>(
      this.pageUrl + "/" + id,
      AuthorizationType.NONE,
      ResponseType.SINGLE,
      Page
    ) as Promise<IResponse<Page>>;
  }

  public async fetchPageBySource(source: string): Promise<IResponse<Page>> {
    return this.service.get<IPageDTO, Page>(
      this.pageBySourceUrl + "/" + source,
      AuthorizationType.NONE,
      ResponseType.SINGLE,
      Page
    ) as Promise<IResponse<Page>>;
  }

  public async updatePage(updatedPage: Page): Promise<IResponse<void>> {
    return this.service.put(
      this.pageUrl,
      updatedPage,
      AuthorizationType.AUTHORIZE
    ) as Promise<IResponse<void>>;
  }

  public async createPage(newPage: Page): Promise<IResponse<Page>> {
    return this.service.post(
      this.pageUrl,
      newPage,
      AuthorizationType.AUTHORIZE,
      ResponseType.SINGLE,
      Page
    ) as Promise<IResponse<Page>>;
  }

  public async deletePage(page: Page): Promise<IResponse<void>> {
    return this.service.delete(
      this.pageUrl + "/" + page.id,
      page,
      AuthorizationType.AUTHORIZE
    ) as Promise<IResponse<void>>;
  }
}

export default PageService;
