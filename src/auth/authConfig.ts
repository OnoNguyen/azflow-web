import {
  Configuration,
  EndSessionRequest,
  LogLevel,
  RedirectRequest,
} from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "8e269668-5996-4bef-87e1-a803cec7ed67",
    authority: "https://azflowext.ciamlogin.com/azflowext.onmicrosoft.com",
    redirectUri: "https://azflow.australiasoutheast.cloudapp.azure.com/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback() {},
      piiLoggingEnabled: false,
      logLevel: LogLevel.Info,
    },
  },
};

const loginRequest: RedirectRequest = {
  scopes: [
    "openid",
    "profile",
    "User.Read",
    "api://6e0b3673-67ab-46e0-b0d2-40480f1acc6d/AzFlow.ReadWrite",
  ],
};

const logoutRequest: EndSessionRequest = {
  postLogoutRedirectUri: "/",
  onRedirectNavigate: () => {
    return true;
  },
};

export { msalConfig, loginRequest, logoutRequest };
