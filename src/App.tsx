import { Route, Routes } from "react-router";
import RootLayout from "./layout/RootLayout";
import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";
import AuthLayout from "./layout/AuthLayout";
import HomePage from "./pages/public/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProfilePage from "./pages/admin/ProfilePage";
import ChatPage from "./pages/admin/ChatPage";
import Loginpage from "./pages/auth/Loginpage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFound from "./pages/public/NotFound";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Publics */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* privates */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>

        {/* auth */} 
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Loginpage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
