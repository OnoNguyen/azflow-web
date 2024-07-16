import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { loginRequest, logoutRequest } from "@/auth/authConfig";

export const useAuth = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState<string>("");

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

  const currentUser = accounts[0]; // Get the current user

  useEffect(() => {
    const fetchToken = async () => {
      if (currentUser) {
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
  }, [instance, currentUser]);

  return {
    isAuthed: isAuthenticated,
    handleLogin,
    handleLogout,
    loading,
    currentUser,
    idToken,
  };
};
