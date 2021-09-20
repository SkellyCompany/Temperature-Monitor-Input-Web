import React from "react";
import css from "./PageBody.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { Page } from "../../../domain/entities/Page";

interface IProps {
  pageMetadata: Page;
  children: any;
}

function PageMetadata(props: IProps) {
  // MARK: Props
  const { children } = props;

  const pageMetadata = new Page({
    src: props.pageMetadata?.src ?? "/",
    name: props.pageMetadata?.name ?? "Temperature Monitor Output",
    description:
      props.pageMetadata?.description ?? "Temperature Monitor Output",
    metaTitle: props.pageMetadata?.metaTitle ?? "Temperature Monitor Output",
    metaDescription:
      props.pageMetadata?.metaDescription ?? "Temperature Monitor Output",
    metaKeyword:
      props.pageMetadata?.metaKeyword ?? "Temperature Monitor Output",
    canonicalPath: props.pageMetadata?.canonicalPath ?? "/",
  });

  // MARK: Constants & Variables
  const router = useRouter();

  //MARK: Render
  return (
    <>
      <Head>
        <title>{pageMetadata?.metaTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          key="description"
          content={pageMetadata?.metaDescription}
        />
        <meta name="title" key="title" content={pageMetadata?.metaTitle} />
        <meta name="keywords" content={pageMetadata?.metaKeyword}></meta>
        <meta
          property="og:title"
          key="og:title"
          content={pageMetadata?.metaTitle}
        />
        <meta property="og:locale" key="og:locale" content="en_EU" />
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content={pageMetadata?.metaDescription}
        />
        <link rel="canonical" href={pageMetadata?.canonicalPath} />
      </Head>
      <div>{children}</div>
    </>
  );
}

export default PageMetadata;
