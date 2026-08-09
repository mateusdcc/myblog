import "../styles/globals.css";
import AppShell from "../components/AppShell";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}
