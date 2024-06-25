import { Outlet } from "react-router-dom";
import { useAuth } from "@/auth/useAuth.tsx";
import { Loader } from "@/component/Loader";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { isAuthed, handleLogin } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthed) {
      handleLogin().then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthed, handleLogin]);

  if (loading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
