import { Route, Routes } from "react-router-dom";
import { PrimaryLayout, StudioLayout } from "@/component/Layout";
import ProtectedRoute from "@/auth/ProtectedRoute.tsx";
import { CreateStory } from "@/page/create";
import { Home } from "@/page/home/home.tsx";
import { EditStory } from "@/page/edit";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrimaryLayout />}>
        <Route index element={<Home />} />
        {/* Add more routes here that use PrimaryLayout */}
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/create" element={<StudioLayout />}>
          <Route index element={<CreateStory />} />
        </Route>
        <Route path="/edit/:storyId/:encodedTitle" element={<StudioLayout />}>
          <Route index element={<EditStory />} />
        </Route>
      </Route>
    </Routes>
  );
};
