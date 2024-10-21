import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Footer from "./Components/Footer/Footer";
import { UserStorage } from "./UserContext";
import ProtectedRoute from "./Components/Elements/ProtectedRoute";
import User from "./Components/User/User";
import Feed from "./Components/Feed/Feed";
function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route
              path="user/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="login/*" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
