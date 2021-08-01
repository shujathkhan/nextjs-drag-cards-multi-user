import type { AppProps } from 'next/app';
import '../styles/globals.css';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import { useEffect } from 'react';

if (typeof window === 'undefined') {
  const { server } = require('../mocks/server');
  server.listen();
} else {
  const { worker } = require('../mocks/browser');
  worker.start({ quiet: true });
}

function MyApp({ Component, pageProps }: AppProps) {
  const pubnub = new PubNub({
    publishKey: 'pub-c-487c33a5-8f7b-4ef9-bf19-1cbc9ad9d294',
    subscribeKey: 'sub-c-95e5e046-f2af-11eb-9d61-d6c76bc6f614',
    uuid: 'e7bb8d21-8705-59f2-a55b-49485c53850e',
  });

  return (
    <PubNubProvider client={pubnub}>
      <Component {...pageProps} />
    </PubNubProvider>
  );
}
export default MyApp;
