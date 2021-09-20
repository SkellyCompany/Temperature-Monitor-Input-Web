import * as React from "react";
import css from "./BasePage.layout.module.scss";

interface IProps {
  children?: React.ReactNode;
}

function BasePageLayout(props: IProps) {
  // MARK: Props
  const { children } = props;

  // MARK: Render
  return <div className={css.mainContainer}>{children}</div>;
}

export default BasePageLayout;
