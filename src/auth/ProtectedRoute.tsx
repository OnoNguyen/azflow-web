import { Outlet } from "react-router-dom";
import { useAuth } from "@/auth/useAuth.tsx";
import { Loader } from "@/component/Loader";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { loading, isAuthed, handleLogin } = useAuth();

  useEffect(() => {
    !isAuthed && !loading && handleLogin();
  }, [loading, isAuthed, handleLogin]);

  if (loading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
