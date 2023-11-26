import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Plan from "pages/Plan/Plan";
import Act from "../Act/Act";
import Reflect from "../Reflect/Reflect";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Page from "../../components/organisms/Page/Page";
import ProtectedRoute from "../../components/organisms/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import { isTokenValid } from "../../utils/tokenValidation";
import Brainstorm from "../Brainstorm/Brainstorm";

const Home = () => {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <Page children={<Plan />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/act"
          element={
            <ProtectedRoute>
              <Page children={<Act />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reflect"
          element={
            <ProtectedRoute>
              <Page children={<Reflect />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/brainstorm"
          element={
            <ProtectedRoute>
              <Page children={<Brainstorm />} />
            </ProtectedRoute>
          }
        />
        <Route
          index
          element={<Navigate to={isTokenValid() ? "/plan" : "login"} replace />}
        />
      </Routes>
    </>
  );
};

export default Home;
