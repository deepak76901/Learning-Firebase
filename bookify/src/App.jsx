import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyNavbar from "./components/MyNavbar";
import ListingPage from "./pages/ListingPage";
import Home from "./components/Home";
import DetailsPage from "./components/DetailsPage";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/listing" element={<ListingPage />} />
        <Route path="/book/view/:id" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
