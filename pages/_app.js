import { MantineProvider } from "@mantine/core";
import { MetaMaskProvider } from "metamask-react";
import { Provider } from "react-redux";
import DefaultStyles from "../Components/DefaultStyles";
import { wrapper, store } from "../store/index";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MetaMaskProvider>
        <MantineProvider
          theme={{
            // Override any other properties from default theme
            fontFamily: "Verdana, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Greycliff CF, sans-serif" },
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          }}
        >
          <DefaultStyles>
            <Component {...pageProps} />
          </DefaultStyles>
        </MantineProvider>
      </MetaMaskProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
