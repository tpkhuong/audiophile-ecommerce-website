import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </React.Fragment>
  );
}
