import "../styles/globals.css";
import { Inter } from "@next/font/google";
import { Provider } from "react-redux";
import { store } from "../features/store";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <Provider Provider store={store}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
