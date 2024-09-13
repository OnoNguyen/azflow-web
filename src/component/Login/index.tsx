import { LoginButton } from "./style";
import { useAuth } from "@/auth/useAuth";
import { Loader } from "@/component/Loader";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

export const Login = () => {
  const { handleLogin, handleLogout, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AuthenticatedTemplate>
        <LoginButton onClick={handleLogout}>Log Out</LoginButton>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginButton onClick={handleLogin}>Log in</LoginButton>
      </UnauthenticatedTemplate>
    </>
  );
};
