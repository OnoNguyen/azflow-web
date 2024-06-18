// TODO: this looks like an interesting pattern so leave it here until July

// import { Redirect, Route } from "react-router-dom";
// import { useIsAuthenticated } from "@azure/msal-react";
//
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = useIsAuthenticated();
//
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// };
//
// export default ProtectedRoute;
