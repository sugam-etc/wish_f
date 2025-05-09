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
import ProtectedRoute from "./Authentication/ProtectedRoute.jsx";
import LoginPage from "./Authentication/LoginPage.jsx";
export const BACKEND_URL = "https://wish-backend-2z6u.onrender.com";
function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route index={true} element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            <Route path="/adventures" element={<Adventures />} />
            {/* <Route path="/admin" element={<BlogAdminPanel />} /> */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/adventures/:id" element={<AdventureDetail />} />
            {/* <Route path="/admin" element={<AdminPage />} /> */}

            {/* ✅ NEW */}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
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
