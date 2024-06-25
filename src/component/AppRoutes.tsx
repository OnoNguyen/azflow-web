// import { Route, Routes } from "react-router-dom";
// import { Home } from "../pages/home";
// import App from "../App";
// import { SignUp } from "../pages/signup";
// import { FreeMind } from "../pages/FreeMind";
// import { CreateEditor } from "@/pages/create";
// import ProtectedRoute from "@/auth/ProtectedRoute.tsx";
//
// export const AppRoutes = () => (
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/signup" element={<SignUp />} />
//     <Route path="/app" element={<App />} />
//     <Route path="/freemind" element={<FreeMind />} />
//     <Route element={<ProtectedRoute />}>
//       <Route path="/create" element={<CreateEditor />} />
//     </Route>
//   </Routes>
// );

import { Route, Routes } from "react-router-dom";
import { PrimaryLayout, StudioLayout } from "@/component/Layout";
import ProtectedRoute from "@/auth/ProtectedRoute.tsx";
import { CreateEditor } from "@/pages/create";
import { Home } from "@/pages/home.tsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrimaryLayout />}>
        <Route index element={<Home />} />
        {/* Add more routes here that use PrimaryLayout */}
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/create" element={<StudioLayout />}>
          <Route index element={<CreateEditor />} />
          {/* Add more routes here that use StudioLayout */}
        </Route>
      </Route>
    </Routes>
  );
};
