import { useMsal } from "@azure/msal-react";
import { LoginButton } from "./style.ts";
import { loginRequest } from "../../auth/authConfig.ts";

export const Login = () => {
  const { instance, accounts } = useMsal();

  const isLoggedIn = accounts.length > 0;

  const handleLogin = () => {
    if (isLoggedIn) {
      return;
    }
    instance.loginRedirect(loginRequest).then(() => {});
  };

  const handleLogout = () => {
    if (!isLoggedIn) {
      return;
    }
    instance.logoutRedirect().then(() => {});
  };

  return isLoggedIn ? (
    <LoginButton onClick={handleLogout}>Log Out</LoginButton>
  ) : (
    <LoginButton onClick={handleLogin}>Log in</LoginButton>
  );
};
