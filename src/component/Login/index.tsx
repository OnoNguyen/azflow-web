import { LoginButton } from "./style";
import { useAuth } from "@/auth/useAuth";
import { Loader } from "@/component/Loader";

export const Login = () => {
  const { isAuthed, handleLogin, handleLogout, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return isAuthed ? (
    <LoginButton onClick={handleLogout}>Log Out</LoginButton>
  ) : (
    <LoginButton onClick={handleLogin}>Log in</LoginButton>
  );
};
