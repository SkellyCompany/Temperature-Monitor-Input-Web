import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import SystemInfo from "../global/SystemInfo";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
