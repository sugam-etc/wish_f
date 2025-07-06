import { Routes, Route } from "react-router-dom";
import UserPrivateRoute from "../../../UserAuth/UserPrivateRoute";
import AdminLayout from "./AdminLayout";
import AdminHome from "./AdminHome";
import UserAdmin from "../../components/User/UserAdmin";
import UserDetail from "../../components/User/UserDetail";
import { BlogForm } from "../../components/BlogForm";
import AdventureForm from "../../components/AdventureForm";
import { EventForm } from "../../components/EventForm";
import AlbumForm from "../Gallery/AlbumForm";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <UserPrivateRoute adminOnly>
            <AdminLayout />
          </UserPrivateRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="users" element={<UserAdmin />} />
        <Route path="users/:userId" element={<UserDetail />} />
        <Route path="blogform/:id?" element={<BlogForm />} />
        <Route path="adventureform/:id?" element={<AdventureForm />} />
        <Route path="eventform/:id?" element={<EventForm />} />
        <Route path="gallery-form" element={<AlbumForm />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
