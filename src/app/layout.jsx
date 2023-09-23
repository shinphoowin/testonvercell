import { Providers } from "./store/Providers";
import Navigation from "./main-nav";
import Footer from "./components/Footer";
import Script from "next/script";
import ProviderWrapper from "./providerwrapper";
// import ConnectionStatus from "./components/Connection";
import "./globals.css";

export const metadata = {
  title: "saungpokki learning platform",
  description: "can learn easily by using online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <ProviderWrapper>
            <Navigation />
            {/* <ConnectionStatus /> */}
            {children}
            <Script src="https://apis.google.com/js/platform.js" async defer />
            <Footer />
          </ProviderWrapper>
        </Providers>
      </body>
    </html>
  );
}
