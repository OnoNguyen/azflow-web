import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ApolloAppProvider from "./graphql/ApolloAppProvider.tsx";
import GlobalStyle from "./GlobalStyle.ts";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./component/AppRoutes.tsx";
import { msalConfig } from "./auth/authConfig.ts";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloAppProvider>
    <GlobalStyle />
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MsalProvider>
    </React.StrictMode>
  </ApolloAppProvider>,
);
