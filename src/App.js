import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import User from "./pages/User";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { fetchProfile } from "./store/slices/userSlice";
import NotFound from "./pages/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.user.token) || localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token));
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={token ? <Navigate to="/profile" /> : <Signin />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
