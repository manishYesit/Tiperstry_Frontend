import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { Provider } from "react-redux";
import Store from "../src/store/store";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { appWithTranslation } from "../i18n";
import ReactGA from "react-ga";
import "./styles3.css";
import './style/custom.css';
import './style/fonts/fonts.css';

class MyApp extends App {
	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");

		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}

		ReactGA.initialize("UA-111370737-1");
		ReactGA.pageview("Tipestry Web App");
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<React.Fragment>
				<Head>
					<title>Tipestry | Home</title>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
					/>
					<meta charSet="UTF-8" />
					<meta
						name="description"
						content="Tipestry - Comment Anywhere and Earn Cryptocurrency."
					/>
					<meta
						name="keywords"
						content="Tipestry, Cryptocurrency, Tipcoin, TIPC, Tipcoins"
					/>
					<meta name="author" content="Tipestry Inc" />
					<meta name="application-name" content="Tipestry" />
					<link rel="icon" type="image/png" href="/static/favicon.png" />
				</Head>
				<Provider store={Store}>
					<ThemeProvider theme={theme}>
						<GoogleReCaptchaProvider
							reCaptchaKey="6LdRe-QUAAAAAH_KLUMZDrjemn6SXp8ClOifEPwx"
						>
							<CssBaseline />
							<Component {...pageProps} />
						</GoogleReCaptchaProvider>
					</ThemeProvider>
				</Provider>
			</React.Fragment>
		);
	}
}

export default appWithTranslation(MyApp);

Store.subscribe(() => {

});
