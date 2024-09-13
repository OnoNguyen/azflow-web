import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useCallback, useEffect, useState } from "react";
import { loginRequest, logoutRequest } from "@/auth/authConfig";

export const useAuth = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState<string>("");

  const handleLogin = useCallback(async () => {
    if (!isAuthenticated && !loading) {
      setLoading(true);
      try {
        await instance.loginRedirect(loginRequest);
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated, loading, instance]);

  const handleLogout = useCallback(async () => {
    if (isAuthenticated && !loading) {
      setLoading(true);
      try {
        await instance.logoutRedirect(logoutRequest);
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated, loading, instance]);

  const currentUser = accounts[0]; // Get the current user

  useEffect(() => {
    const fetchToken = async () => {
      if (currentUser && !loading) {
        setLoading(true);
        try {
          await instance.initialize();
          const res = await instance.acquireTokenSilent({
            account: currentUser,
            scopes: ["User.Read"],
          });
          const token = `${res.tokenType} ${res.idToken}`;
          setIdToken(token);
        } catch (e) {
          console.error("fetchToken error:", e);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchToken().catch((e) => console.error("fetchToken error:", e));
  }, [instance, currentUser, loading]);

  return {
    handleLogin,
    handleLogout,
    loading,
    currentUser,
    idToken,
  };
};
