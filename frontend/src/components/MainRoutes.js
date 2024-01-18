import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Page-Not-Found";
import Homepage from "../pages/Homepage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
import MyDashboard from "../pages/MyDashboard";
import Dashboard from "../pages/Dashboard";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route
        path="/my-dashboard"
        element={
          <PrivateRoute>
            <Navbar />
            <MyDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Navbar />
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
