const msalConfig = {
  auth: {
    clientId: "8e269668-5996-4bef-87e1-a803cec7ed67",
    authority: "https://azflowext.ciamlogin.com/azflowext.onmicrosoft.com",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

const loginRequest = {
  scopes: ["User.Read"],
};

export { msalConfig, loginRequest };
