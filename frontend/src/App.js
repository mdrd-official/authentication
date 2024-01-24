import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import { useSelector } from "react-redux";
import EditUserForm from "./pages/EditUserForm";
import AddUserForm from "./pages/AddUserForm";




function App() {
  const { isAuthenticated } = useSelector((state) => state.adminAuth); 
  return (
    <>
      {!isAuthenticated ? <Navbar />: null }
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/edit-user/:id" element={<EditUserForm />} />
        <Route path="/add-user" element={<AddUserForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
