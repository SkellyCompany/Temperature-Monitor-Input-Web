import css from "./index.module.scss";
import useTranslation from "next-translate/useTranslation";
import Locales from "../../global/Locales";
import { AppLogger } from "../../utilities/app-logger/AppLogger";
import { useEffect } from "react";
import { LogType } from "../../utilities/app-logger/models/LogType";
import { LogRecipient } from "../../utilities/app-logger/models/LogRecipient";
import { GetServerSideProps } from "next";
import {
  BasePageHOC,
  basePagePropsServerSide,
  IBasePageHOCProps,
} from "../../ui/hocs/base/BasePage.hoc";

function LandingPage(props: IBasePageHOCProps) {
  // MARK: Props
  const { basePageProps } = props;

  // MARK: Constants
  const landingLocale = Locales.Landing;
  const { t } = useTranslation(landingLocale.identifier);
  const logger = new AppLogger();

  // MARK: State

  // MARK: Effects
  useEffect(() => {
    logger.log(LogType.INFO, LogRecipient.DEVELOPER, "Hello!");
  }, []);

  // MARK: Render
  return (
    <BasePageHOC basePageProps={basePageProps}>
      <div className={css.mainContainer}>
        {t(landingLocale.title)} Temperature Monitor Output Web
      </div>
    </BasePageHOC>
  );
}

// MARK: Server Side Props export
export const getServerSideProps: GetServerSideProps = basePagePropsServerSide;

// MARK: Page export
export default LandingPage;
