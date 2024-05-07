import "./App.css";
// import ErrorPage from "./error-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./pages/Home";
import Prices from "./components/prices/Prices";
import AboutUs from "./pages/aboutUs";
import FAQS from "./pages/faqs";
import Samples from "./pages/Samples";
import Guarantees from "./pages/guarantees/Guarantees";
import Services from "./pages/services";
import MyOrders from "./components/order/myOrder";
import MyProfile from "./pages/MyProfile/profile";
import Essay from "./pages/services/Slug";
import { useAppDispatch } from "./redux/hooks";
import { addUser } from "./redux/states/userState";
import Dashboard from "./pages/dashboard";
import GuaranteesSlug from "./pages/guarantees/slug";
import { ProtectedRoute } from "./helpers/ProtectedRoutes";
import OrderPage from "./pages/order";
import Profile from "./pages/MyProfile/profile";
import ResetPasswordPage from "./pages/resetPassword";

function App() {
  const dispatch = useAppDispatch();
  const user = localStorage.getItem("token");

  if (user !== null) {
    const decodeUser = JSON.parse(user);
    dispatch(
      addUser({
        id: decodeUser.userId,
        role: decodeUser.role,
        username: decodeUser.username,
      })
    );
  }
  // console.log();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="prices" element={<Prices />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="samples" element={<Samples />} />
          <Route path="guarantees" element={<Guarantees />} />
          <Route path="guarantees/:name" element={<GuaranteesSlug />} />
          <Route path="faq" element={<FAQS />} />
          <Route path="myOrders" element={<MyOrders />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="services" element={<Services />} />
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="services/:name" element={<Essay />} />
          <Route
            path="reset-password/:token/:id"
            element={<ResetPasswordPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
