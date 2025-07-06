import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Adventures from "./pages/Adventures.jsx";
import AdventureDetail from "./pages/AdventureDetail.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import UserLogin from "../UserAuth/UserLogin.jsx";
import UserRegisterPage from "./components/User/UserRegister.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import UserAdmin from "./components/User/UserAdmin.jsx";
import AdminPage from "./components/AdminPage.jsx";
import GalleryPage from "./pages/Gallery/GalleryPage.jsx";
import AlbumForm from "./pages/Gallery/AlbumForm.jsx";
import AdventureForm from "./components/AdventureForm.jsx";
import { EventForm } from "./components/EventForm.jsx";
import { BlogForm } from "./components/BlogForm.jsx";
import { BlogPostPage } from "./BlogComponents/ActivityPopup.jsx";
import MembershipPurchase from "./components/User/MembershipPurchase.jsx";
import { UserAuthProvider } from "../UserAuth/UserAuthContext.jsx";
import UserPrivateRoute from "../UserAuth/UserPrivateRoute.jsx";
import UserDetail from "./components/User/UserDetail.jsx";
import ItemStorePage from "./pages/Store/StorePage.jsx";
import ItemDetailPage from "./pages/Store/ItemDetail.jsx";
import ItemForm from "./pages/Store/ItemForm.jsx";
import MembershipPurchaseForm from "./components/User/MembershipPurchase.jsx";
import MembershipManagement from "./pages/Admin/MembershipManagement.jsx";
import PurchaseForm from "./pages/Purchase/PurchaseForm.jsx";
import AdminPurchaseDashboard from "./pages/Purchase/PurchaseDashboard.jsx";
import WallClimbingGuide from "./pages/Guides.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
function App() {
  return (
    <UserAuthProvider>
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
            <Route path="/store" element={<ItemStorePage />} />
            <Route path="/store/:id" element={<ItemDetailPage />} />
            <Route path="/membership" element={<MembershipPurchaseForm />} />
            <Route path="/guides" element={<WallClimbingGuide />} />

            <Route path="*" element={<NotFoundPage />} />

            {/* User authentication routes */}
            <Route path="/login" element={<UserLogin />} />
            <Route path="/userregister" element={<UserRegisterPage />} />

            {/* Protected user routes */}
            <Route
              path="/userprofile"
              element={
                <UserPrivateRoute>
                  <UserProfile />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/usermembership"
              element={
                <UserPrivateRoute>
                  <MembershipPurchase />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/userprofile/edit/:id"
              element={
                <UserPrivateRoute>
                  <UserRegisterPage />
                </UserPrivateRoute>
              }
            />

            {/* Protected admin routes */}
            <Route
              path="/admin"
              element={
                <UserPrivateRoute adminOnly>
                  <AdminPage />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/gallery-form"
              element={
                <UserPrivateRoute adminOnly>
                  <AlbumForm />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/adventureform/:id?"
              element={
                <UserPrivateRoute adminOnly>
                  <AdventureForm />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/blogform/:id?"
              element={
                <UserPrivateRoute adminOnly>
                  <BlogForm />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/eventform/:id?"
              element={
                <UserPrivateRoute adminOnly>
                  <EventForm />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/useradmin"
              element={
                <UserPrivateRoute adminOnly>
                  <UserAdmin />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/admin/users/:userId"
              element={
                <UserPrivateRoute adminOnly>
                  <UserDetail />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/storeform"
              element={
                <UserPrivateRoute adminOnly>
                  <ItemForm />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/purchaseform"
              element={
                <UserPrivateRoute>
                  <PurchaseForm />
                </UserPrivateRoute>
              }
            />
            <Route
              path="/purchasedashboard"
              element={
                <UserPrivateRoute adminOnly>
                  <AdminPurchaseDashboard />
                </UserPrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserAuthProvider>
  );
}

export default App;
