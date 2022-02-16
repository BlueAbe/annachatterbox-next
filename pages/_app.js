import styles from "../styles/index.scss";

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="content">
        <div className="u-wrapper">
          <div className="container">
            <Header className="header" propsFlags={pageProps.flagsTab} />
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
    </>
  );
}

export default MyApp;
