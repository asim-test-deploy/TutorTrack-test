import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import { Profile } from "./components/Profile.jsx";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  // Scroll to landing-page sections after route navigation to a section link.
  useEffect(() => {
    if (pathname !== "/" || !hash) {
      return;
    }

    document.getElementById(hash.slice(1))?.scrollIntoView({
      behavior: "smooth",
    });
  }, [hash, pathname]);

  return null;
}

function Root() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default Root;
