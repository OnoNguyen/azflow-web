import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig.ts";

export const Login = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).then((response) => {
      console.log(response);
    });
  };

  return <button onClick={handleLogin}>Login</button>;
};
