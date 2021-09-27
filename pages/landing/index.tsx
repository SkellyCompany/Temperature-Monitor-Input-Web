import css from "./index.module.scss";
import useTranslation from "next-translate/useTranslation";
import Locales from "../../global/Locales";
import { AppLogger } from "../../utilities/app-logger/AppLogger";
import { useEffect, useState } from "react";
import { LogType } from "../../utilities/app-logger/models/LogType";
import { LogRecipient } from "../../utilities/app-logger/models/LogRecipient";
import { GetServerSideProps } from "next";
import {
  BasePageHOC,
  basePagePropsServerSide,
  IBasePageHOCProps,
} from "../../ui/hocs/base/BasePage.hoc";
import { TemperatureService } from "../../infrastructure/services/http-services/Temperature.service";
import { HumidityService } from "../../infrastructure/services/http-services/Humidity.service";
import { ResponseStatus } from "../../infrastructure/services/http-services/core/IResponse";

function LandingPage(props: IBasePageHOCProps) {
  // MARK: Props
  const { basePageProps } = props;

  // MARK: Constants
  const landingLocale = Locales.Landing;
  const { t } = useTranslation(landingLocale.identifier);
  const logger = new AppLogger();
  const temperatureService = new TemperatureService();
  const humidityService = new HumidityService();

  const minTemperatureValue = -70;
  const maxTemperatureValue = 70;
  const defaultTemperatureValue = 0;
  const minHumidityValue = 0;
  const defaultHumidityValue = 50;
  const maxHumidityValue = 100;

  // MARK: State
  const [temperature, setTemperature] = useState<number>(
    defaultTemperatureValue
  );
  const [humidity, setHumidity] = useState<number>(defaultHumidityValue);

  // MARK: Effects

  // MARK: UI Events
  function didTapSendTemperature() {
    temperatureService
      .sendRecord({
        value: temperature,
        time: Date.now() / 1000,
      })
      .then((response) => {
        if (response.status === ResponseStatus.Success) {
          logger.log(
            LogType.SUCCESS,
            LogRecipient.USER,
            "Successfully sent temperature record"
          );
        } else {
          logger.log(
            LogType.ERROR,
            LogRecipient.USER,
            "Could not send temperature record",
            response.error?.getErrorMessage()
          );
        }
      });
  }

  function didTapSendHumidity() {
    humidityService
      .sendRecord({
        value: humidity / 100,
        time: Date.now() / 1000,
      })
      .then((response) => {
        if (response.status === ResponseStatus.Success) {
          logger.log(
            LogType.SUCCESS,
            LogRecipient.USER,
            "Successfully sent humidity record"
          );
        } else {
          logger.log(
            LogType.ERROR,
            LogRecipient.USER,
            "Could not send humidity record",
            response.error?.getErrorMessage()
          );
        }
      });
  }

  // MARK: Render
  return (
    <BasePageHOC basePageProps={basePageProps}>
      <div className={css.mainContainer}>
        <div className={css.inputContainer}>
          <div className={css.temperatureContainer}>
            <div className={css.temperatureHeader}>Temperature</div>
            <div className={css.temperatureSliderContainer}>
              <div className={css.temperatureSliderValue}>{temperature} °C</div>
              <input
                type="range"
                className={css.temperatureSlider}
                min={minTemperatureValue}
                max={maxTemperatureValue}
                value={temperature}
                defaultValue={temperature}
                onChange={(event) => {
                  setTemperature(parseInt(event.target.value));
                }}
              />
            </div>
            <div
              className={css.temperatureButton}
              onClick={didTapSendTemperature}
            >
              SEND
            </div>
          </div>
          <div className={css.humidityContainer}>
            <div className={css.humidityHeader}>Humidity</div>
            <div className={css.humiditySliderContainer}>
              <div className={css.humiditySliderValue}>{humidity}%</div>
              <input
                type="range"
                className={css.humiditySlider}
                min={minHumidityValue}
                max={maxHumidityValue}
                value={humidity}
                defaultValue={defaultHumidityValue}
                onChange={(event) => {
                  setHumidity(parseInt(event.target.value));
                }}
              />
            </div>
            <div className={css.humidityButton} onClick={didTapSendHumidity}>
              SEND
            </div>
          </div>
        </div>
      </div>
    </BasePageHOC>
  );
}

// MARK: Server Side Props export
export const getServerSideProps: GetServerSideProps = basePagePropsServerSide;

// MARK: Page export
export default LandingPage;
