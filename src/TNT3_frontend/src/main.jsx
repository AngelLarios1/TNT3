import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { Client, InternetIdentity } from "@bundly/ares-core";
import { IcpConnectContextProvider } from "@bundly/ares-react";

const client = Client.create({
  restCanisters: {
    backend: {
      baseUrl: " http://bw4dl-smaaa-aaaaa-qaacq-cai.localhost:4943",
    },
  },
  providers: [
    new InternetIdentity({
      providerUrl: "http://by6od-j4aaa-aaaaa-qaadq-cai.localhost:4943/",
    }),
  ],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IcpConnectContextProvider client={client}>
      <App/>
    </IcpConnectContextProvider>
  </React.StrictMode>,
);
