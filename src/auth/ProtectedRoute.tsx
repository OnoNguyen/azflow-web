import { Outlet } from "react-router-dom";
import { useAuth } from "@/auth/useAuth.tsx";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { LoginButton } from "@/component/Login/style.ts";

const ProtectedRoute = () => {
  const { handleLogin } = useAuth();

  return (
    <>
      <AuthenticatedTemplate>
        <Outlet />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>Please login to continue</h1>
        <LoginButton onClick={handleLogin}>Log in</LoginButton>
      </UnauthenticatedTemplate>
    </>
  );
};
export default ProtectedRoute;
