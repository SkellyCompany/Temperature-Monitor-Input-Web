import "./globals.scss";
import type { AppProps /*, AppContext */ } from "next/app";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "next/router";
import Loading from "../ui/components/shared/loading/Loading";
import css from "./_app.module.scss";

function App({ Component, pageProps }: AppProps) {
  // MARK: State
  const [loading, setLoading] = React.useState(false);

  // MARK: Effects
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  // MARK: Render
  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading ? (
        <div className={css.loadingWrapper}>
          <div className={css.loadingContainer}>
            <Loading></Loading>
          </div>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default App;
