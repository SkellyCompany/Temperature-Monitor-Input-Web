import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  NextPageContext,
} from "next";
import React from "react";
import { Page } from "../../../domain/entities/Page";
import { IResponse } from "../../../infrastructure/services/http-services/core/IResponse";
import PageService from "../../../infrastructure/services/http-services/Page.service";
import BasePageLayout from "../../layouts/base/BasePage.layout";
import PageMetadata from "../shared/PageMetadata.hoc";

export interface IBasePageProps {
  pageResponse?: IResponse<Page>;
}

export interface IBasePageHOCProps {
  basePageProps: IBasePageProps;
  children?: any;
}

export function BasePageHOC(props: IBasePageHOCProps) {
  // MARK: Props
  const { basePageProps, children } = props;

  // MARK: Render
  return (
    <div>
      {basePageProps && (
        <PageMetadata pageMetadata={basePageProps?.pageResponse?.data}>
          <BasePageLayout>{children}</BasePageLayout>
        </PageMetadata>
      )}
    </div>
  );
}

export const basePagePropsServerSide: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  //MARK: Data Fetching
  const pageService = new PageService(ctx);
  const pageResponse = await pageService.fetchPageBySource(ctx.req.url);

  // MARK: Props
  const hocProps: IBasePageHOCProps = {
    basePageProps: {
      pageResponse: pageResponse,
    },
  };
  return JSON.parse(JSON.stringify({ props: hocProps }));
};

export const basePagePropsStatic = async (
  ctx: GetStaticPropsContext,
  url: string
) => {
  //MARK: Data Fetching
  const pageService = new PageService(null);
  const pageResponse = await pageService.fetchPageBySource(url);

  // MARK: Props
  const hocProps: IBasePageHOCProps = {
    basePageProps: {
      pageResponse: pageResponse,
    },
  };
  return JSON.parse(JSON.stringify({ props: hocProps }));
};
