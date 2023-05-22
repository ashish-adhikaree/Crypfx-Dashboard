import React, { Suspense, useEffect, useState, useContext } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeSettings } from "../src/theme/Theme";
import createEmotionCache from "../src/createEmotionCache";
import { Provider } from "react-redux";
import Store from "../src/store/Store";
import RTL from "./../src/layouts/full/shared/customizer/RTL";
import { useSelector } from "../src/store/Store";
import { AppState } from "../src/store/Store";
import { AuthContext } from "../context";
import BlankLayout from "../src/layouts/blank/BlankLayout";
import FullLayout from "../src/layouts/full/FullLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../src/_mockApis";
import "../src/utils/i18n";

// CSS FILES
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import axios from "axios";
import Script from "next/script";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const layouts: any = {
  Blank: BlankLayout,
};

const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: any = props;
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);

  const layout = pageProps.layout || "Full";
  const Layout = layouts[Component.layout] || FullLayout;
  const router = useRouter();
  const authData = useContext(AuthContext);

  if (
    !router.asPath.includes("auth") &&
    (!authData || (authData && authData.type === ""))
  ) {
    return <></>;
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {router.asPath.includes("auth") ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </RTL>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default (props: MyAppProps) => {
  const [authData, setAuthData] = useState<{
    isLoggedin: boolean;
    type: string;
    userid: string;
    fullname: string;
    email: string;
    image: string;
  }>();

  const router = useRouter();

  const verifyjwt = async () => {
    const { data } = await axios.get("/api/getUserDetails");
    if (data.status === "success") {
      setAuthData({
        isLoggedin: true,
        fullname: data.data.fullname,
        image:
          data.data.image && data.data.image !== ""
            ? `data:image/png;base64,${Buffer.from(data.data.image).toString(
                "base64"
              )}`
            : "",
        type: data.data.type,
        userid: data.data.userid,
        email: data.data.email,
      });
    } else {
      setAuthData({
        isLoggedin: false,
        fullname: "",
        image: "",
        type: "",
        userid: "",
        email: "",
      });
    }
  };

  useEffect(() => {
    if (authData) {
      if (authData.isLoggedin) {
        if (router.asPath.includes("auth")) {
          router.push("/");
        }
      } else {
        if (!router.asPath.includes("auth")) {
          router.push("/auth/login");
        }
      }
    }
  }, [authData]);

  useEffect(() => {
    verifyjwt();
  }, []);

  return (


      <Provider store={Store}>
        <AuthContext.Provider
          value={
            authData
              ? authData
              : {
                  isLoggedin: false,
                  fullname: "",
                  image: "",
                  type: "",
                  userid: "",
                  email: "",
                }
          }
        >
          <MyApp {...props} />
          <ToastContainer />
        </AuthContext.Provider>
      </Provider>
    
  );
};
