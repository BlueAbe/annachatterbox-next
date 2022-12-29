import styles from "../styles/index.scss";
import Script from "next/script";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="content">
        <div className="u-wrapper">
          <div className="container container--header">
            <Header className="header" />
          </div>
        </div>
        <div className="container container--shadow container--stretch">
          <Navigation props={pageProps.categories} />
          <Component {...pageProps} />
        </div>
      </div>
      <div className="u-wrapper">
        <div className="container">
          <Footer />
        </div>
      </div>
      <Script
        src="https://unpkg.com/axios/dist/axios.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script src="/js/axios.js" />
    </>
  );
}

export default MyApp;
