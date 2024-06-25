import { Configuration, LogLevel } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "8e269668-5996-4bef-87e1-a803cec7ed67",
    authority: "https://azflowext.ciamlogin.com/azflowext.onmicrosoft.com",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback(_, message) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Info,
    },
  },
};

const loginRequest = {
  scopes: ["User.Read"],
};

const logoutRequest = {
  postLogoutRedirectUri:
    window.location.pathname === "/create" ? "/" : window.location.href,
};

export { msalConfig, loginRequest, logoutRequest };
