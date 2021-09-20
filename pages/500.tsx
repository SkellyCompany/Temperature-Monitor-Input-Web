import {
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

function page500(props: IBasePageHOCProps) {
  // MARK: Constants
  const { basePageProps } = props;

  // MARK: Render
  return (
    <>
      {basePageProps && (
        <BasePageHOC basePageProps={basePageProps}>
          Internal server error!
        </BasePageHOC>
      )}
    </>
  );
}

// MARK: Static Props export
export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  return basePagePropsStatic(ctx, Routes.internalServerError);
};

// MARK: Page export
export default page500;
