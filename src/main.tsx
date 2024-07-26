import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ApolloAppProvider from "@/gql/ApolloAppProvider.tsx";
import GlobalStyle from "./GlobalStyle.ts";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./component/AppRoutes.tsx";
import { msalConfig } from "./auth/authConfig.ts";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MsalProvider instance={msalInstance}>
    <ApolloAppProvider>
      <GlobalStyle />
      <React.StrictMode>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </React.StrictMode>
    </ApolloAppProvider>
  </MsalProvider>,
);
