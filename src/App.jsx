import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Adventures from "./pages/Adventures.jsx";
import AdventureDetail from "./pages/AdventureDetail.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import { AuthProvider } from "../Authentication/AuthContext.jsx";

import AdminPage from "./components/AdminPage.jsx";
import PrivateRoute from "../Authentication/PrivateRoute.jsx";
import LoginPage from "../Authentication/Login.jsx";
import GalleryPage from "./pages/Gallery/GalleryPage.jsx";
import AlbumForm from "./pages/Gallery/AlbumForm.jsx";
import AdventureForm from "./components/AdventureForm.jsx";
import { EventForm } from "./components/EventForm.jsx";
import { BlogForm } from "./components/BlogForm.jsx";
import { BlogPostPage } from "./BlogComponents/ActivityPopup.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow gap-4">
          <Routes>
            {/* Public routes */}
            <Route index={true} element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/adventures" element={<Adventures />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/adventures/:id" element={<AdventureDetail />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected admin routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["admin"]}>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/gallery-form"
              element={
                <PrivateRoute roles={["admin"]}>
                  <AlbumForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/adventureform/:id?"
              element={
                <PrivateRoute roles={["admin"]}>
                  <AdventureForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/blogform/:id?"
              element={
                <PrivateRoute roles={["admin"]}>
                  <BlogForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/eventform/:id?"
              element={
                <PrivateRoute roles={["admin"]}>
                  <EventForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
