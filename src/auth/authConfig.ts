import {
  Configuration,
  EndSessionRequest,
  LogLevel,
  RedirectRequest,
} from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_ENTRA_CLIENT_ID,
    authority: import.meta.env.VITE_ENTRA_AUTHORITY,
    redirectUri: import.meta.env.VITE_ENTRA_REDIRECT_URI,
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
