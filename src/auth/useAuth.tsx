import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useState } from "react";
import { loginRequest, logoutRequest } from "@/auth/authConfig";

export const useAuth = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!isAuthenticated) {
      setLoading(true);
      try {
        await instance.loginRedirect(loginRequest);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    if (isAuthenticated) {
      setLoading(true);
      try {
        await instance.logoutRedirect(logoutRequest);
      } finally {
        setLoading(false);
      }
    }
  };

  return { isAuthed: isAuthenticated, handleLogin, handleLogout, loading };
};
