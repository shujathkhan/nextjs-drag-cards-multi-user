import type { AppProps } from 'next/app';
import '../styles/globals.css';

if (typeof window === 'undefined') {
  const { server } = require('../mocks/server');
  server.listen();
} else {
  const { worker } = require('../mocks/browser');
  worker.start({ quiet: true });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
