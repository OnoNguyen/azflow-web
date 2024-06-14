import { useMsal } from "@azure/msal-react";
import { LoginButton } from "./style.ts";
import { IS_LOGGED_IN, TOGGLE_LOGGED_IN } from "../../graphql/localQueries.ts";
import { useMutation, useQuery } from "@apollo/client";
import { loginRequest } from "../../auth/authConfig.ts";

export const Login = () => {
  const { instance } = useMsal();

  const [toggleLoggedIn] = useMutation(TOGGLE_LOGGED_IN);
  const { data } = useQuery(IS_LOGGED_IN);

  const handleLogin = () => {
    instance.acquireTokenPopup(loginRequest).then((response) => {
      console.log(response);
      toggleLoggedIn({ variables: { status: true } }).then((r) => r);
    });
  };

  const handleLogout = () => {
    instance.logout().then((response) => {
      console.log(response);
      toggleLoggedIn({ variables: { status: false } }).then((r) => r);
    });
  };

  return data.isLoggedIn ? (
    <LoginButton onClick={handleLogout}>Log Out</LoginButton>
  ) : (
    <LoginButton onClick={handleLogin}>Log in</LoginButton>
  );
};
