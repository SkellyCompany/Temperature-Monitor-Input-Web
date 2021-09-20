import * as React from "react";
import css from "./Loading.module.scss";

function Loading() {
  return (
    <div className={css.loadingWrapper}>
      <div className={css.loadingContainer}>
        <div className={css.loader}>
          <div className={css.loaderInner}></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
