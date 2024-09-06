import { Outlet } from "react-router-dom";
import { useAuth } from "@/auth/useAuth.tsx";
import { Login } from "@/component/Login";

const ProtectedRoute = () => {
  const { isAuthed } = useAuth();

  return isAuthed ? (
    <Outlet />
  ) : (
    <>
      <h4>Please login to continue</h4>
      <Login />
    </>
  );
};

export default ProtectedRoute;
