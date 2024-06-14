// import { useIsAuthenticated, useMsal } from "@azure/msal-react";
//
// const AuthProvider: FC = ({ children }) => {
//   const { instance } = useMsal();
//   const isAuthenticated = useIsAuthenticated();
//
//   const login = () => {
//     instance
//       .loginPopup({
//         scopes: ["openid", "profile", "email"],
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
//
//   const logout = () => {
//     instance.logoutPopup().catch((error) => {
//       console.error(error);
//     });
//   };
//
//   if (!isAuthenticated) {
//     return <button onClick={login}>Login</button>;
//   }
//
//   return (
//     <div>
//       <button onClick={logout}>Logout</button>
//       {children}
//     </div>
//   );
// };
//
// export default AuthProvider;
