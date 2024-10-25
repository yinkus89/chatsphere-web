import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import UploadStatus from "./components/UploadStatus";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Wrap private routes in a PrivateRoute component */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/status/upload" element={<UploadStatus />} />
            </Route>

            {/* Redirect all other paths to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
