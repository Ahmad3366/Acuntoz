import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages
import Home from "./pages/home";
import Dashbord from "./pages/dashbord";
import Signup from "./pages/Signup";

// components
import Footer from "./components/footer";
import Header from "./components/header";
import ForgotPassword from "./components/ForgotPassword";
import EmailVerfiy from "./components/EmailVerfiy";
import UpdateProfile from "./components/UpdateProfile";
import UserPage from "./pages/UserPage";

function App() {
  const { user } = useAuthContext();
  const admin = user ? user.username == "System Administrator" : null;

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={!admin ? user ? <Navigate to={`/user/${user.userId}/update-profile`} /> : <Home /> : <Navigate to={"/dashbord"} />}
            />
            <Route
              path="/dashbord/*"
              element={admin ? <Dashbord /> : <Navigate to={"/"} />}
            />
            <Route
              path="/createUser"
              element={admin ? <Signup /> : <Navigate to={"/"} />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/user/:id/update-profile"
              element={user ? <UserPage /> : <Navigate to={'/'} />}
            />

            <Route
              path="/api/user/:id/verify/:token"
              element={<EmailVerfiy />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
