import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  NextPageContext,
} from "next";
import React, { useEffect, useState } from "react";
import Routes from "../global/Routes";
import {
  BasePageHOC,
  basePagePropsStatic,
  IBasePageHOCProps,
} from "../ui/hocs/base/BasePage.hoc";
function page404(props: IBasePageHOCProps) {
  // MARK: Constants
  const { basePageProps } = props;

  // MARK: Render
  return (
    <>
      <BasePageHOC basePageProps={basePageProps}>Page not found!</BasePageHOC>
    </>
  );
}

// MARK: Static Props export
export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  return basePagePropsStatic(ctx, Routes.notFound);
};

// MARK: Page export
export default page404;
